const Sequelize = require("sequelize");
const UserModel = require("../models/User");
const TeamModel = require("../models/Team");
const ProjectModel = require("../models/Project");
const ProjectPhaseModel = require("../models/ProjectPhase");
const GradeModel = require("../models/Grade");

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
const Team = TeamModel(sequelize, Sequelize);
const Project = ProjectModel(sequelize, Sequelize);
const ProjectPhase = ProjectPhaseModel(sequelize, Sequelize);
const Grade = GradeModel(sequelize, Sequelize);

User.belongsToMany(Team, { through: "UserTeams", foreignKey: "userId" });
Team.belongsToMany(User, { through: "UserTeams", foreignKey: "teamId" });

Team.hasMany(Project, { foreignKey: "teamId" });
Project.belongsTo(Team, { as: "ProjectTeam", foreignKey: "teamId" });

Team.hasMany(Project, { as: "JudgeProjects", foreignKey: "judgeTeamId" });
Project.belongsTo(Team, { as: "JudgeTeam", foreignKey: "judgeTeamId" });

User.hasMany(Project, { foreignKey: "professorId" });
Project.belongsTo(User, { as: "Professor", foreignKey: "professorId" });

Project.hasMany(ProjectPhase);
ProjectPhase.belongsTo(Project);

ProjectPhase.hasMany(Grade);
Grade.belongsTo(ProjectPhase);

User.hasMany(Grade);
Grade.belongsTo(User);

sequelize.sync({ force: false }).then(() => {
  console.log("Database sync completed!");
});

module.exports = {
  User,
  Project,
  ProjectPhase,
  Grade,
  Team,
  sequelize,
};
