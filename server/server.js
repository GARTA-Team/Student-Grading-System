const express = require("express");
const Sequelize = require("sequelize");
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
  const dashboard = {
    inProgressCount: 0,
    completedCount: 0,
    toBeGradedCount: 0,
    projects: [],
  };

  try {
    const user = await User.findByPk(req.user.id);

    const userJudgeTeams = await user.getTeams({
      where: {
        type: "JUDGE",
      },
    });

    const teams = await user.getTeams({
      where: {
        type: "STUDENT",
      },
    });

    // await Project.create({
    //   name: "nume",
    //   summary: "sumar",
    //   deadline: "10-10-2020",
    //   status: "IN PROGRESS",
    // });

    for (let i = 0; i < teams.length; i++) {
      let projects = await teams[i].getProjects({
        where: {
          status: "FINISHED",
        },
      });
      dashboard.completedCount += projects.length;
    }

    for (let i = 0; i < teams.length; i++) {
      let projects = await teams[i].getProjects({
        where: {
          status: "IN PROGRESS",
        },
      });
      dashboard.inProgressCount += projects.length;
    }

    for (let i = 0; i < teams.length; i++) {
      let projectsTemp = await teams[i].getProjects();
      if (projectsTemp != null) {
        for (let j = 0; j < projectsTemp.length; j++) {
          let phases = await projectsTemp[j].getProjectPhases();
          if (phases) {
            let phasesDone = 0;
            for (let k = 0; k < phases.length; k++) {
              if (phases.data) {
                phasesDone++;
              }
            }
            projectsTemp[j].percentage = (phasesDone / phases.length) * 100;
          }
          dashboard.projects.push(projectsTemp[j]);
        }
      }
    }

    for (let i = 0; i < userJudgeTeams.length; i++) {
      let projects = await userJudgeTeams[i].getProjects({
        where: {
          status: {
            [Sequelize.Op.not]: "FINISHED",
          },
        },
      });
      dashboard.toBeGradedCount += projects.length;
    }

    res.status(200).send(dashboard);
  } catch (error) {
    console.warn(error);
  }
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
