module.exports = (sequelize, type) => sequelize.define("Grade", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grade: {
    type: type.INTEGER,
    allowNull: false,
  },
});
