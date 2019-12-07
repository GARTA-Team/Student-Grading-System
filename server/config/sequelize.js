const Sequelize = require("sequelize");
const UserModel = require("../models/user");
const ProjectModel = require("../models/project");
const UserProjectAccessModel = require("../models/users-project-access");
const ProjectGradesModel = require("../models/project-grades");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

const User = UserModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const ProjectGrades = ProjectGradesModel(sequelize, Sequelize);
const UserProjectAccess = UserProjectAccessModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("Database sync completed!");
});

module.exports = {
  User,
  Project,
  ProjectGrades,
  UserProjectAccess,
  sequelize,
};
