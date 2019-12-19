module.exports = (sequelize, type) => sequelize.define("ProjectGrades", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phaseId: { //projectId
    // foreignKey -> this should link the ProjectGrades table with ProjectPhases table
    type: type.INTEGER,
    required: true,
    allowNull: false,
  },
  userId: {
    type: type.INTEGER,
    allowNull: false,
  },
  grade: {
    type: type.INTEGER,
    allowNull: false,
  },
});
