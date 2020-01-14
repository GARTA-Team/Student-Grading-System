const express = require("express");
const Yup = require("yup");
const sequelize = require("sequelize");
const moment = require("moment");
const { Project, User, Team, ProjectPhase } = require("../config/sequelize");

const { Op } = sequelize;


const projectSchema = Yup.object({
  name: Yup.string().required(),
  summary: Yup.string().required(),
  teamId: Yup.number()
    .positive()
    .required(),
  professorId: Yup.number()
    .positive()
    .required(),
  deliverables: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        weight: Yup.number()
          .positive()
          .max(1)
          .required(),
        deadline: Yup.date()
          .min(new Date())
          .required(),
      }),
    )
    .required()
    .min(1)
    .max(6)
    .test(
      "sums-to-1",
      "sum-to-1",
      (value) =>
        value.reduce(
          (accumulator, currentValue) => accumulator + currentValue.weight,
          0,
        ) === 1,
    ),
});

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // return all the users projects
    const { id } = req.user;

    const teams = await Team.findAll({
      include: [
        {
          model: User,
          where: { id, type: "STUDENT" },
        },
      ],
    });

    const promises = [];

    teams.forEach((team) => promises.push(team.getProjects()));

    let projects = await Promise.all(promises); // returns array of arrays

    // add the team name to each project
    projects = projects.map((projectArray, index) =>
      projectArray.map((e) => {
        // we can't add a field to the object returned from sequelize, so we convert to JSOn first
        const newObject = e.toJSON();

        newObject.teamName = teams[index].name;

        return newObject;
      }),
    );

    projects = projects.flat(); // now array of projects

    res.status(200).json(projects);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

/** Creates the project, projectPhases and the judge team */
router.post("/", async (req, res) => {
  try {
    // yup crashes if the array is not present, trowing a different error, so we check it ourself
    if (!req.body.deliverables) throw new Error("ValidationError");

    await projectSchema.validate(req.body);

    const { teamId, deliverables, ...projectData } = req.body;

    /* get the project deadline by finding the latest deadline */
    // sort by date
    const deliverablesDeadlines = deliverables.map(d => moment(d.deadline)).sort((a, b) => a.diff(b));
    const deadline = moment.max(deliverablesDeadlines);

    // check if the proffesor id is valid
    const { professorId } = projectData;
    const professor = await User.findByPk(professorId);

    if (!professor || professor.type !== "PROFESSOR") {
      const err = new Error("invalid professor id.");
      err.name = "ValidationError";

      throw err;
    }

    const project = await Project.create({
      ...projectData,
      deadline: deadline.toDate(),
    });

    // create all the phases
    const phases = await Promise.all(deliverables.map((d) => ProjectPhase.create(d)));

    await project.setProjectPhases(phases);

    await project.setProjectTeam(teamId);

    const team = await project.getProjectTeam();

    const users = await team.getUsers();

    const userIds = users.map(user => user.id);

    // create the judge team for the project excluding the team members
    const judgeTeam = await Team.create({
      name: `${project.name}-judge`,
      type: "JUDGE",
    });

    const judges = await User.findAll({
      where: {
        type: "STUDENT",
        id: {
          [Op.notIn]: userIds,
        },
      },
      order: sequelize.literal("rand()"), // 5 random users
      limit: 5,
    });

    const judgesIds = judges.map(judge => judge.id);

    // at least 1 judge
    if (judgesIds.length < 1) {
      throw new Error("Internal server error!");
    }

    await judgeTeam.setUsers(judgesIds);

    await project.setJudgeTeam(judgeTeam);

    res.status(201).json({ id: project.id, name: project.name });
  } catch (e) {
    if (e.name === "ValidationError") {
      res.status(400).json({
        message: "Submited project is not valid",
        erros: e.errors,
      });
    } else {
      console.warn(e);
      res.status(500).json({ message: "server error" });
    }
  }
});

// TODO
// router.get("/:id", async (req, res) => {
//   try {
//     const project = await Project.findByPk(req.params.id);

//     if (project) {
//       res.status(200).json(project);
//     } else {
//       res.status(404).json({ message: "not found" });
//     }
//   } catch (error) {
//     console.warn(error);
//     res.status(500).json({ message: "server error" });
//   }
// });

router.post("/:id/phases/:phaseId", async (req, res) => {
  try {
    // if (!req.body.deliverables) throw new Error("ValidationError");

    // await projectSchema.validate(req.body);

    const newPhase = req.body;

    const project = await Project.findByPk(req.params.id);

    const projectPhase = await project.getProjectPhases({
      where: {
        id: req.params.id,
      },
    });

    if (projectPhase.data == null) {
      // await projectPhase.update(newPhase);

      let judgeTeam = await Team.findByPk(project.judgeTeamId);
      let users = await judgeTeam.getUsers();
      let nrOfJudges = users.length;
      let projectPhases = await project.getProjectPhases();
      let finished = true;

      for (let i = 0; i < projectPhases.length; i++) {
        let grades = await projectPhases[i].getGrades();
        if (grades.length !== nrOfJudges) {
          finished = false;
          break;
        }
      }
      if (finished) {
        project.update({
          status: "FINISHED",
        });
      }

      console.log(users);
    }

    // let projectPhases = await project.getProjectPhases();

    res.status(200).json(project);
  } catch (e) {
    if (e.name === "ValidationError") {
      res.status(400).json({ message: "Submited project is not valid" });
    } else {
      console.warn(e);
      res.status(500).json({ message: "server error" });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.update(req.body);
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
