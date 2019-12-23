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
  delivered: {
    type: type.STRING,
    defaultValue: "NO",
    validate: {
      isIn: [["NO", "YES"]],
    }
  },
  proportion: {
    type: type.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 100,
    },
  },
});
