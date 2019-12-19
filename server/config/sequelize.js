const Sequelize = require("sequelize");
const UserModel = require("../models/User");
const ProjectModel = require("../models/Project");
const UserProjectAccessModel = require("../models/UsersProjectAccess");
const ProjectGradesModel = require("../models/ProjectGrades");
const ProjectDataModel = require("../models/ProjectData");
const ProjectPhasesModel = require("../models/ProjectPhases");
const GradesModel = require("../models/Grades");
const TeamsModel = require("../models/Teams");
const UserTeamsModel = require("../models/UserTeams");

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
const ProjectData = ProjectDataModel(sequelize, Sequelize);
const ProjectPhases = ProjectPhasesModel(sequelize, Sequelize);
const Grades = GradesModel(sequelize, Sequelize);
const Teams = TeamsModel(sequelize, Sequelize);
const UserTeams = UserTeamsModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("Database sync completed!");
});

module.exports = {
  User,
  Project,
  ProjectGrades,
  UserProjectAccess,
  ProjectData,
  ProjectPhases,
  Grades,
  Teams,
  UserTeams,
  sequelize,
};
