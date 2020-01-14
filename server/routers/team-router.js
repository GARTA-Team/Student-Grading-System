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


module.exports = router;
