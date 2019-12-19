module.exports = (sequelize, type) => sequelize.define("Teams", {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: type.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        },
    },
});