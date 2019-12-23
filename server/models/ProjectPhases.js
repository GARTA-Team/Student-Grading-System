module.exports = (sequelize, type) => sequelize.define("ProjectPhases", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectId: {
    type: type.INTEGER,
    required: true,
    allowNull: false,
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
