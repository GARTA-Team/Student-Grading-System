const express = require("express");
const { Project } = require("../config/sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // get the team, create the project and set the relationship
    const { teamId, ...projectData } = req.body;

    const project = await Project.create(projectData);

    await project.setProjectTeam(teamId);

    res.status(201).json(project);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

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
