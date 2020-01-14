const express = require("express");
const { Team, User } = require("../config/sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teams = await Team.findAll({
      attributes: [["id", "value"], ["name", "label"]],
    });

    console.log(teams)

    res.status(200).json(teams);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const team = await Team.create({ name, type: "STUDENT" });

    res.status(200).json(team);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});


module.exports = router;
