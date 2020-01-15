module.exports = (sequelize, type) => sequelize.define("Project", {
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
  summary: {
    type: type.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  deadline: {
    type: type.DATE,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: type.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [["IN PROGRESS", "WAITING FOR GRADING", "FINISHED"]],
    },
    defaultValue: "IN PROGRESS",
  },
  grade: {
    type: type.DECIMAL(4, 2),
    allowNull: true,
    validate: {
      min: 1,
      max: 10,
    },
  },
});
