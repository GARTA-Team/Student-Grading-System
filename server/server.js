const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;
const { sequelize } = require("./config/sequelize");
const passport = require("./config/passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const isAuthenticated = require("./config/auth");
const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

let userRouter = require("./routers/user-router");
let loginRouter = require("./routers/login-router");
let projectRouter = require("./routers/project-router");

app.all("*", function(req, resp, next) {
  console.log(req.path); // do anything you want here
  next();
});
app.use("/", loginRouter);
app.use(isAuthenticated);
app.use("/user-api", userRouter);
app.use("/project-api", projectRouter);

app.get("/", isAuthenticated, (req, res) => {
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

app.listen(port, () => console.log(`Listening on port ${port}`));
