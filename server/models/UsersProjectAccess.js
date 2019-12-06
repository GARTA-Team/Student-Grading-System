module.exports = (sequelize, type) => sequelize.define(
  "UsersProjectAccess", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      // this will be the multipleForeignKey that will link the User table with UserProjectAcces table
      type: type.INTEGER,
      required: true,
      allowNull: false,
    },
    projectId: {
      // this will be the multipleForeignKey that will link the Project table with UserProjectAcces table
      type: type.INTEGER,
      required: true,
      allowNull: false,
    },
    accessType: {
      type: type.INTEGER,
      allowNull: false,
    },
  },
);
