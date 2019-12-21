const express = require("express");
const { User } = require("../config/sequelize");
const passport = require("../config/passport");
const isAuthenticated = require("../config/auth");

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  // They won't get this or even be able to access this page if they aren't authed
  res.status(202).json({ msg: "ok" });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely
// thanks to how we configured our Sequelize User Model. If the user is created successfully,
// proceed to log the user in, otherwise send back an error
router.post("/signup", async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(406).json({ msg: "missing username" });
    } else if (!req.body.email) {
      res.status(406).json({ msg: "missing email" });
    } else if (!req.body.pass) {
      res.status(406).json({ msg: "missing password" });
    } else {
      await User.create(req.body).then(() => {
        res.status(201).json({ msg: "user created" });
      }).catch((err) => {
        res.status(409).json({ msg: err }); // just for debugging
      });
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ msg: "server error" });
  }
});
// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
// Route for getting some data about our user to be used client side
router.get("/user_data", isAuthenticated, (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id,
    });
  }
});

module.exports = router;
