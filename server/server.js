const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { sequelize } = require("./config/sequelize");
const passport = require("./config/passport");
const isAuthenticated = require("./config/auth");
const { User, Project, Team } = require("./config/sequelize");

const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/** MIDDLEWARE */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

/** ROUTES */
const userRouter = require("./routers/user-router");
const loginRouter = require("./routers/login-router");
const projectRouter = require("./routers/project-router");

app.use("/", loginRouter);
app.use(isAuthenticated);
app.use("/user-api", userRouter);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.status(200).redirect("/dashboard");
});

app.get("/dashboard", async (req, res) => {
  const dashboard = { completedCount: 0, toBeGradedCount: 0, projects: [] };
  console.log(req.user);

  try {
    const completed = await Project.findAll({
      where: {
        status: "FINISHED",
      },
    });

    const user = await User.findByPk(req.user.id);

    const teams = user.getTeams({
      where: {
        type: "judge",
      },
    });

    for (let i = 0; i < teams.length; i++) {
      let projects = await team.getProjects();
      console.log(projects);
    }

    // console.log(teams);

    // const teams = await req.user.getTeams({
    //   where: {
    //     userId: req.user.id,
    //   },
    // });

    // console.log(teams);

    dashboard.completedCount = completed.length;

    res.status(200).send(dashboard);
  } catch (error) {
    console.warn(error);
  }

  // const teams = await Team.findAll({
  //   where: {
  //     teamId:
  //     type: 1,
  //   },
  // });

  // const toBeGraded = await Project.findAll({
  //   where: {
  //     status: "FINISHED",
  //   },
  // });
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
