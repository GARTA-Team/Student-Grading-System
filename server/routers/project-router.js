const express = require("express");
const Yup = require("yup");
const sequelize = require("sequelize");
const moment = require("moment");
const {
  Project,
  User,
  Team,
  ProjectPhase,
  Grade,
} = require("../config/sequelize");

const { Op } = sequelize;

const projectSchema = Yup.object({
  name: Yup.string().required(),
  summary: Yup.string().required(),
  teamId: Yup.number().positive().required(),
  professorId: Yup.number().positive().required(),
  deliverables: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      weight: Yup.number().positive().min(1).max(100).required(),
      deadline: Yup.date().min(new Date()).required(),
    }),
  )
    .required()
    .min(1)
    .max(6)
    .test(
      "sums-to-100",
      "sum-to-100",
      (value) => value.reduce((accumulator, currentValue) => accumulator + currentValue.weight, 0) === 100,
    ),
});

const router = express.Router();

/**
 * Get the projects based on the team type
 * @param {String} teamType The team type
 */
async function getProjects(req, res, teamType) {
  // return all the users projects
  const { id } = req.user;

  const teams = await Team.findAll({
    include: [{
      model: User,
      where: { id, type: "STUDENT" },
    }],
    where: {
      type: teamType,
    },
  });

  const promises = [];

  if (teamType === "STUDENT") {
    teams.forEach((team) => promises.push(team.getProjects()));
  } else {
    teams.forEach((team) => promises.push(team.getJudgeProjects()));
  }

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

  return projects;

}

router.get("/", async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (user.type === "PROFESSOR") {
      const projects = await Project.findAll({ professorId: req.user.id, type: "STUDENT" });

      res.status(200).json({ professor: projects });
    } else if (user.type === "STUDENT") {
      const data = {
        student: await getProjects(req, res, "STUDENT"),
        judge: await getProjects(req, res, "JUDGE"),
      };

      res.status(200).json(data);
    }
    else {
      throw new Error();
    }
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
    const deliverablesDeadlines = deliverables
      .map((d) => moment(d.deadline))
      .sort((a, b) => a.diff(b));
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
    const phases = await Promise.all(
      deliverables.map((d) => ProjectPhase.create(d)),
    );

    await project.setProjectPhases(phases);

    const team = await Team.findByPk(teamId);

    if (team.type !== "STUDENT") {
      const err = new Error("invalid team id.");
      err.name = "ValidationError";

      throw err;
    }

    await project.setProjectTeam(teamId);


    const users = await team.getUsers();

    const userIds = users.map((user) => user.id);

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

    const judgesIds = judges.map((judge) => judge.id);

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
        errors: e.errors,
      });
    } else {
      console.warn(e);
      res.status(500).json({ message: "server error" });
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find the project by id,
    // and also include the type for the user: judge if the user is a judge, student if user is a student
    const project = await Project.findOne({
      attributes: [
        "id",
        "name",
        "summary",
        "deadline",
        "status",
        "createdAt",
        "updatedAt",
        "teamId",
        "professorId",
        "grade",
      ],
      where: {
        id: req.params.id,
      },
      include: [
        { model: ProjectPhase },
        // get the team to find the type of the user
        {
          model: Team,
          as: "ProjectTeam",
          attributes: ["id"],
          include: {
            model: User,
            where: {
              id: req.user.id,
            },
          }
        },
        {
          model: Team,
          as: "JudgeTeam",
          attributes: ["id"],
          include: {
            model: User,
            attributes: [],
            where: {
              id: req.user.id,
            },
          },
        }
      ],
    });

    if (project) {
      const json = project.toJSON();

      // add the type
      if (json.ProjectTeam) json.type = "STUDENT";
      else if (json.JudgeTeam) json.type = "JUDGE";

      delete json.JudgeTeam;
      delete json.ProjectTeam;

      if (!json.type) {
        const user = await User.findByPk(req.user.id);

        if (user.type === "PROFESSOR") json.type = "PROFESSOR";
      }

      if (json.type === "STUDENT" || json.type === "PROFESSOR") {
        const team = await project.getProjectTeam();

        json.members = await team.getUsers({ attributes: ["username"] });
      }

      // add the professor name
      const professor = await User.findByPk(project.professorId);
      json.professorName = professor.username;


      const phases = await project.getProjectPhases({
        where: {
          deadline: {
            [Op.gte]: moment().toDate(),
          },
        },
        order: [["deadline"]],
      });

      const firstPhase = phases.shift();
      if (firstPhase) json.nextDeadline = firstPhase.deadline;

      res.status(200).json(json);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

/** set the project phase data */
router.patch("/phases/:id", async (req, res) => {
  try {
    const projectPhase = await ProjectPhase.findByPk(req.params.id);

    if (!projectPhase) {
      res.status(404).json({ message: "not found" });
    } else {
      const project = await projectPhase.getProject();

      // check if user is member of the team
      const team = await project.getProjectTeam();
      const teamMembers = await team.getUsers();

      if (!teamMembers.some(({ id }) => id === req.user.id)) {
        const err = new Error("Can't update deliverable of team you are not part of!");
        err.name = "ValidationError";

        throw err;
      }

      if (projectPhase.data === null) {
        const { data } = req.body;

        await projectPhase.update({ data });

        const phases = await ProjectPhase.findAll({
          include: {
            model: Project,
            where: {
              id: project.id,
            },
          },
          order: [["id"]],
        });

        const lastPhase = phases.pop();

        if (lastPhase.data !== null) {
          await project.update({
            status: "WAITING FOR GRADING",
          });
        } else if (project.status === "NOT STARTED") {
          await project.update({
            status: "IN PROGRESS",
          });
        }
      } else {
        const err = new Error("Can't overide phase data!");
        err.name = "ValidationError";

        throw err;
      }

      res.status(200).json(projectPhase);
    }
  } catch (e) {
    if (e.name === "ValidationError") {
      res.status(400).json({
        message: "Submited project is not valid",
        errors: e.errors,
      });
    } else {
      console.warn(e);
      res.status(500).json({ message: "server error" });
    }
  }
});

router.post("/phases/:id/grade", async (req, res) => {
  try {
    const { grade } = req.body;

    console.log(grade)

    if (grade < 1 || grade > 10) {
      const err = new Error();
      err.name = "ValidationError";
      err.errors = "Grade must be between 1 and 10";

      throw err;
    }

    const projectPhase = await ProjectPhase.findByPk(req.params.id);

    if (!projectPhase) {
      res.status(404).json({ message: "not found" });
    } else {
      const project = await projectPhase.getProject();

      // check if user is member of the judges team
      const team = await project.getJudgeTeam();
      const judges = await team.getUsers();

      if (!judges.some(({ id }) => id === req.user.id)) {
        const err = new Error();
        err.name = "ValidationError";
        err.errors = "Can't grade project, you're not a judge!";

        throw err;
      }

      if (projectPhase.data === null) {
        const err = new Error();
        err.name = "ValidationError";
        err.errors = "Can't overide grade!";

        throw err;
      }

      const grades = await projectPhase.getGrades();

      if (grades.length && grades.some(({ UserId }) => UserId === req.user.id)) {
        const err = new Error();
        err.name = "ValidationError";
        err.errors = "You have already set a grade!";

        throw err;
      }


      const gradeObj = await Grade.create({
        grade: parseFloat(grade),
        UserId: req.user.id,
      });

      await projectPhase.addGrade(gradeObj);

      if ((grades.length + 1) >= judges.length) {

        grades.forEach((g) => grades.push(g.grade));

        grades.sort((a, b) => a - b);

        if (grades.length + 1 > 2) {
          // remove max and min grade conform project requirments
          grades.shift();
          grades.pop();
        }

        let total = 0;
        grades.forEach(g => { total += g; });

        total += grade;

        await projectPhase.update({
          grade: total / (grades.length + 1),
        });
      }

      // check if the last grade was added and the project is over
      const phases = await ProjectPhase.findAll({
        include: {
          model: Project,
          where: {
            id: project.id,
          },
        },
        order: [["id"]],
      });

      const lastPhase = phases[phases.length - 1];
      const lastPhaseGrades = await lastPhase.getGrades();

      if (lastPhase.data !== null && lastPhaseGrades.length === judges.length) {
        let total = 0;
        phases.forEach(p => { total += parseFloat(p.grade) * (p.weight / 100); });

        await project.update({
          status: "FINISHED",
          grade: total,
        });
      }

      res.status(200).json({ grade });
    }
  } catch (e) {
    if (e.name === "ValidationError") {
      res.status(400).json({
        message: "Submitted grade is not valid",
        errors: e.errors,
      });
    } else {
      console.warn(e);
      res.status(500).json({ message: "server error" });
    }
  }
});

/** Route returns the grade of a specif phase. Used by judges only */
router.get("/phases/:id/grade", async (req, res) => {
  try {
    const projectPhase = await ProjectPhase.findByPk(req.params.id);

    if (!projectPhase) {
      res.status(404).json({ message: "not found" });
    } else {
      const project = await projectPhase.getProject();

      // check if user is member of the team
      const team = await project.getJudgeTeam();
      const judges = await team.getUsers();

      if (!judges.some(({ id }) => id === req.user.id)) {
        const err = new Error();
        err.name = "ValidationError";
        err.errors = "Can't see grade, you're not a judge!";

        throw err;
      }

      const gradeObj = await Grade.findOne({
        where: {
          ProjectPhaseId: req.params.id,
          UserId: req.user.id,
        },
        attributes: ["grade"],
      });

      if (gradeObj) {
        const { grade } = gradeObj;

        res.status(200).json({ grade });
      } else {
        res.status(200).json({ grade: "Not graded!" });
      }
    }
  } catch (e) {
    if (e.name === "ValidationError") {
      res.status(400).json({
        message: "Submited project is not valid",
        errors: e.errors,
      });
    } else {
      console.warn(e);
      res.status(500).json({ message: "server error" });
    }
  }
});

module.exports = router;
