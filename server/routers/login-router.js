const express = require("express");
const { User } = require("../config/sequelize");
var passport = require("../config/passport");

let router = express.Router();

router.post("/login", passport.authenticate("local"), function(req, res) {
  // They won't get this or even be able to access this page if they aren't authed
  res.json({ msg: "ok" });
});
//
// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", function(req, res) {
  console.log(req.body);
  User.create(req.body)
    .then(function() {
      res.redirect(307, "/login");
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
    });
});
// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
// Route for getting some data about our user to be used client side
router.get("/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;
