module.exports = (sequelize, type) => sequelize.define("UserTeams", {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: type.INTEGER,
        primaryKey: true,
    },
    teamId: {
        type: type.INTEGER,
        primaryKey: true,
    },
});