const express = require("express");
const { User } = require("../sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;

let router = express.Router();

// Momentan face sync la import cu force=false
// ca sa nu se stearga ce punem acolo pt debug

// router.get("/create", async (req, res) => {
//   try {
//     await sequelize.sync({ force: true });
//     res.status(201).json({ message: "created" });
//   } catch (e) {
//     console.warn(e);
//     res.status(500).json({ message: "server error" });
//   }
// });

router.get("/users", async (req, res) => {
  try {
    let users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "server error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    // let unhashed = req.body.pass;

    if (req.query.bulk && req.query.bulk == "on") {
      //   bcrypt.hash(unhashed, saltRounds, async function(err, hash) {
      //     await User.create({
      //       id: req.body.id,
      //       username: req.body.username,
      //       pass: hash,
      //       session_id: req.body.session_id,
      //       email: req.body.email
      //     });
      //   });
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

router.get("/users/:id", async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
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

router.put("/users/:id", async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
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

router.delete("/users/:id", async (req, res) => {
  try {
    let user = await User.findByPk(req.params.id);
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

router.get("/test", (req, res) => {
  res.status(200).json({ message: "test" });
});

module.exports = router;
