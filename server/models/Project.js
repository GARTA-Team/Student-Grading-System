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
    allowNull: true,
    validate: {
      notEmpty: true,
      isIn: [["NOT STARTED", "IN PROGRESS", "FINISHED", "OVERDUE"]],
    },
  },
});
