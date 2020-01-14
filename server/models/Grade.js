module.exports = (sequelize, type) => sequelize.define("Grade", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grade: {
    type: type.DECIMAL(4, 2),
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
});
