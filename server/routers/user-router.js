const express = require("express");
const Sequelize = require("sequelize");
const { User } = require("../config/sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/students", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        type: "STUDENT",
        id: {
          [Sequelize.Op.not]: req.user.id,
        },
      },
      attributes: ['id', 'username']
    });
    res.status(200).json(users);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.query.bulk && req.query.bulk === "on") {
      await User.bulkCreate(req.body);
      res.status(201).json({ message: "created" });
    } else {
      await User.create(req.body);
      res.status(201).json({ message: "created" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/professors", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [["id", "value"], ["username", "label"]],
      where: { type: "PROFESSOR" },
    });

    res.status(200).json(users);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
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
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
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
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
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
