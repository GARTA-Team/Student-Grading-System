module.exports = (sequelize, type) => sequelize.define("ProjectData", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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