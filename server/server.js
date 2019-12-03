const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 3001;
const { sequelize, User } = require("./sequelize");
const passport = require("passport");
const passportJWT = require("passport-jwt");
var jwt = require("jsonwebtoken");
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt; // JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "wowwow";
// JwtStrategy takes your token from the Auth header and uses the id stored in it to pass you to the next step
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = getUser({ email: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);
const app = express();
app.use(passport.initialize());
// var corsOptions = {
// 	origin: 'http://localhost:3000',
// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userRouter = require("./routers/user-router");
let projectRouter = require("./routers/project-router");

const createUser = async ({ username, email, pass }) => {
  return await User.create({ username, email, pass });
};
const getUser = async user => {
  return await User.findOne({
    where: user
  });
};

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    res.json({
      msg: "Congrats! You are seeing this because you are authorized"
    });
  }
);

// app.use(passport.authenticate("jwt", { session: false })); //enable this to have global token auth

app.post("/register", function(req, res, next) {
  try {
    let { username, email, pass } = req.body;
    pass = bcrypt.hashSync(pass, parseInt(process.env.SALT_ROUNDS));
    createUser({ username, email, pass }).then(user =>
      res.json({ user, msg: "account created successfully" })
    );
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "server error" });
  }
});
// /login checks the email and password against the db and then sends back a unique token
app.post("/login", async function(req, res, next) {
  try {
    const { email, pass } = req.body;
    if (email && pass) {
      let user = await getUser({ email });
      if (!user) {
        res.status(401).json({ msg: "No such user found", user });
      }
      if (bcrypt.compareSync(pass, user.pass)) {
        let payload = { id: user.email };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.status(200).json({ msg: "ok", token: token });
      } else {
        res.status(401).json({ msg: "Password is incorrect" });
      }
    }
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "server error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "this is a server, why are you here?" });
});

app.get("/create", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "created" });
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

app.use("/user-api", userRouter);
app.use("/project-api", projectRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
