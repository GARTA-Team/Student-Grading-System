module.exports = (sequelize, type) => sequelize.define("Grades", {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    phaseId: {
        type: type.INTEGER,
        required: true,
        allowNull: false,
    },
    userId: {
        type: type.INTEGER,
        required: true,
        allowNull: false,
    },
    grade: {
        type: type.INTEGER,
        required: true,
        allowNull: false,
    },
});