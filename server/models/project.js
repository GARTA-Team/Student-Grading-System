module.exports = (sequelize, type) => sequelize.define("Project", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: type.STRING,
    allowNull: true,
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
  dateCreated: {
    type: type.DATE,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  lastModified: {
    type: type.DATE,
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
    },
  },
  grading: {
    type: type.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
});
