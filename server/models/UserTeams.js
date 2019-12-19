module.exports = (sequelize, type) => sequelize.define("UserTeams", {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: type.INTEGER,
        allowNull: false,
    },
    teamId: {
        type: type.INTEGER,
        allowNull: false,
    },
});