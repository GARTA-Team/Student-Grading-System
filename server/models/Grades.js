module.exports = (sequelize, type) => sequelize.define("Grades", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phaseId: {
    type: type.INTEGER,
    allowNull: false,
  },
  userId: {
    type: type.INTEGER,
    allowNull: false,
  },
  grade: {
    type: type.INTEGER,
    allowNull: false,
  },
});
