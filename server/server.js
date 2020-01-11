const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { sequelize } = require("./config/sequelize");
const passport = require("./config/passport");
const isAuthenticated = require("./config/auth");

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
  session(
    {
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
      },
    },
  ),
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

app.get("/dashboard", (req, res) => {
  res.status(200).send("this is the dashboard");
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
