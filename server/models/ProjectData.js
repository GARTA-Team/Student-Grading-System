module.exports = (sequelize, type) => sequelize.define("ProjectData", {
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
  data: {
    type: type.INTEGER,
    allowNull: true,
    validate: {
      isUrl: true,
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