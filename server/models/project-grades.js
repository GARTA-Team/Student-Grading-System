module.exports = (sequelize, type) => sequelize.define("project_grades", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  project_id: {
    type: type.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: type.INTEGER,
    allowNull: false,
  },
  grade: {
    type: type.INTEGER,
    allowNull: false,
  },
});
