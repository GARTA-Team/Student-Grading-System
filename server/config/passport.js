const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("./sequelize");
//We will need the models folder to check passport agains

const getUser = async user => {
  return await User.findOne({
    where: user
  });
};
//
// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pass"
    },
    async function(email, pass, done) {
      if (email && pass) {
        let user = await getUser({ email: email });
        if (!user) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        if (!bcrypt.compareSync(pass, user.pass)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        return done(null, user);
      }
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
