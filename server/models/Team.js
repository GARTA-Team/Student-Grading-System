module.exports = (sequelize, type) => sequelize.define("Team", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: type.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: type.STRING,
    allowNull: false,
    validate: {
      isIn: [["STUDENT", "JUDGE"]],
      notEmpty: true,
    },
  },
});
