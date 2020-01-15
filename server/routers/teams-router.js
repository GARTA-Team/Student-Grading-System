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

router.get("/owned", async (req, res) => {
  try {
    const teamsOfUser = await Team.findAll({ //get teams of the user that will have to implement projects
      where: {
        type: 'STUDENT'
      },
      include: [
        {
          model: User,
          where: {
            id: req.user.id
          },
          attributes: []
        },
      ]
    });

    const teamsWithMembers = [];

    for (const team of teamsOfUser) {
      const teamJson = team.toJSON();

      const members = await team.getUsers({
        attributes: ['username']
      });

      const projects = await team.getProjects({
        attributes: ['name', 'id']
      });

      teamsWithMembers.push({
        ...teamJson,
        members,
        projects,
      });
    }


    res.status(200).json(teamsWithMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
})

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
    let createdTeam = await Team.create(teamToBeAdded);

    creatingUser.addTeam(createdTeam)

    for (let i = 0; i < teamToBeAdded.members.length; i++) {
      let usertemp = await User.findByPk(teamToBeAdded.members[i].id);
      await usertemp.addTeam(createdTeam)
    }

    res.status(201).json({ message: "created" });
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
