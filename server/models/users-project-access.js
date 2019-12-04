module.exports = (sequelize, type) => sequelize.define(
  "users_project_access", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: type.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: type.INTEGER,
      allowNull: false,
    },
    access_type: {
      type: type.INTEGER,
      allowNull: false,
    },
  },
);
