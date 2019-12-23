const Sequelize = require("sequelize");
const UserModel = require("../models/User");
const UserTeamsModel = require("../models/UserTeams");
const TeamModel = require("../models/Team");
const ProjectModel = require("../models/Project");
const ProjectDataModel = require("../models/ProjectData");
const ProjectPhasesModel = require("../models/ProjectPhases");
const GradesModel = require("../models/Grades");

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
// const UserTeams = UserTeamsModel(sequelize, Sequelize);
const Team = TeamModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const ProjectData = ProjectDataModel(sequelize, Sequelize);
const ProjectPhases = ProjectPhasesModel(sequelize, Sequelize);
const Grades = GradesModel(sequelize, Sequelize);

User.belongsToMany(Team, { through: "UserTeams", foreignKey: "userId" });
Team.belongsToMany(User, { through: "UserTeams", foreignKey: "teamId" });

// TODO relatii pentru restul, o sa fie nevoie sa scot coloane din mai multe tabele

sequelize.sync({ force: true }).then(() => {
  console.log("Database sync completed!");
});

module.exports = {
  User,
  Project,
  ProjectData,
  ProjectPhases,
  Grades,
  Team,
  sequelize,
};
