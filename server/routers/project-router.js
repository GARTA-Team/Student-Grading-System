const express = require("express");
const Yup = require("yup");
const sequelize = require("sequelize");
const { Project, User, Team } = require("../config/sequelize");

// used to validate the project

// name,
// deliverables,
// summary,
// teamId,
// professorId,

const projectSchema = Yup.object({
  name: Yup.string().required(),
  summary: Yup.string().required(),
  teamId: Yup.number().positive().required(),
  professorId: Yup.number().positive().required(),
  deliverables: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      weight: Yup.number().positive().max(1).required(),
      deadline: Yup.date().min(new Date()).required(),
    }),
  )
    .required()
    .min(1)
    .max(6)
    .test(
      "sums-to-1",
      "sum-to-1",
      (value) => value.reduce((accumulator, currentValue) => accumulator + currentValue.weight, 0) === 1,
    ),
});


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // return all the users projects
    const { id } = req.user;

    const teams = await Team.findAll({
      include: [{
        model: User,
        where: { id, type: "STUDENT" },
      }],
    });

    const promises = [];

    teams.forEach(team => promises.push(team.getProjects()));

    let projects = await Promise.all(promises); // returns array of arrays

    // add the team name to each project
    projects = projects.map((projectArray, index) => projectArray.map((e) => {
      // we can't add a field to the object returned from sequelize, so we convert to JSOn first
      const newObject = e.toJSON();

      newObject.teamName = teams[index].name;

      return newObject;
    }));

    projects = projects.flat(); // now array of projects

    res.status(200).json(projects);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

/** Creates the project and the judge team */
router.post("/", async (req, res) => {
  try {
    // get the team, create the project and set the relationship

    // yup crashes if the array is not present trowing different error, so we check it ourself
    if (!req.body.deliverables) throw new Error("ValidationError");

    await projectSchema.validate(req.body);

    const { teamId, ...projectData } = req.body;

    const project = await Project.create(projectData);

    await project.setProjectTeam(teamId);

    // create the judge team for the project
    // User.findAll({
    //   include: [{
    //     model: Project,

    //   }]
      // attributes: ["id", [sequelize.fn("COUNT")]]
      // where: {
      //   type: "STUDENT",
      // },

    // })

    res.status(201).json(project);
  } catch (e) {
    if (e.name === "ValidationError") {
      res.status(400).json({ message: "Submited project is not valid" });
    } else {
      console.warn(e);
      res.status(500).json({ message: "server error" });
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    // const phases = project.get

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const project = await Project.findByPk(req.params.id);
//     if (project) {
//       await project.update(req.body);
//       res.status(202).json({ message: "accepted" });
//     } else {
//       res.status(404).json({ message: "not found" });
//     }
//   } catch (error) {
//     console.warn(error);
//     res.status(500).json({ message: "server error" });
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.destroy();
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
