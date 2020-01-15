module.exports = (sequelize, type) => sequelize.define("ProjectPhase", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: type.STRING,
    allowNull: false,
  },
  deadline: {
    type: type.DATE,
    allowNull: true,
    validate: {
      isDate: true,
    },
  },
  weight: {
    type: type.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 100,
    },
  },
  data: {
    type: type.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  description: {
    type: type.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  updateMessage: {
    type: type.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
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
