const express = require("express");
const { Teams, UserTeams } = require("../config/sequelize");

const router = express.Router();

router.get("/teams", async (req, res) => {
  try {
    const teams = await Teams.findAll();
    res.status(200).json(teams);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/teams/:id", async (req, res) => {
  try {
    const team = await Teams.findAll({
      where: {
        id: req.params.id
      }
    });
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});


router.get("/user_teams", async (req, res) => {
  try {
    const userTeams = await UserTeams.findAll();
    res.status(200).json(userTeams);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

router.post("/new_team", async (req, res) => {
  try {
    if (req.query.bulk && req.query.bulk === "on") {
      await Teams.bulkCreate(req.body);
      res.status(201).json({ message: "created" });
    } else {
      await Teams.create(req.body);
      res.status(201).json({ message: "created" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

router.post("/new_user_team", async (req, res) => {
  try {
    if (req.query.bulk && req.query.bulk === "on") {
      await UserTeams.bulkCreate(req.body);
      res.status(201).json({ message: "created" });
    } else {
      await UserTeams.create(req.body);
      res.status(201).json({ message: "created" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/own/:userId", async (req, res) => {
  try {
    const userTeams = await UserTeams.findAll({
      where: {
        userId: req.params.userId
      }
    });
    if (userTeams) {
      res.status(200).json(userTeams);
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
    const team = await Teams.findByPk(req.params.id);
    if (team) {
      await team.update(req.body);
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
    const team = await Teams.findByPk(req.params.id);
    if (team) {
      await team.destroy();
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
