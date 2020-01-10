module.exports = (sequelize, type) => sequelize.define("ProjectPhase", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phaseNumber: {
    type: type.INTEGER,
    allowNull: false,
  },
  phaseDeadline: {
    type: type.DATE,
    allowNull: true,
    validate: {
      isDate: true,
    },
  },
  proportion: {
    type: type.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 100,
    },
  },
  data: {
    type: type.INTEGER,
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
});
