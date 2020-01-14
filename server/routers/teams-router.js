const express = require("express");
const { User, Team } = require("../config/sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json(teams);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findAll({
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

router.post("/", async (req, res) => {
  try {
    const creatingUser = await User.findByPk(req.user.id);
    const { teamToBeAdded } = req.body;
    req.body.teamToBeAdded.members.push(creatingUser);
    await Team.create(teamToBeAdded);
    res.status(201).json({ message: "created"});
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

router.get("/own", async(req, res) => {
  try {
    const user = await User.findByPk(req.user.id); //get the user id that is logged in
    const teamsOfUser = await user.getTeams({ //get teams of the user that will have to implement projects
      where: {
        type: "STUDENT"
      }
    });
    res.status(200).json(teamsOfUser);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
})


// router.get("/own/:userId", async (req, res) => {
//   try {
//     const userTeams = await UserTeams.findAll({
//       where: {
//         userId: req.params.userId
//       }
//     });
//     if (userTeams) {
//       res.status(200).json(userTeams);
//     } else {
//       res.status(404).json({ message: "not found" });
//     }
//   } catch (error) {
//     console.warn(error);
//     res.status(500).json({ message: "server error" });
//   }
// });

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
