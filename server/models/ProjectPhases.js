module.exports = (sequelize, type) => sequelize.define("ProjectPhases", {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    projectId: {
        // foreignKey -> this should link the ProjectPhases table with Project table
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
            notEmpty: true,
        },
    },
    delivered: {
        type: type.STRING,
        validate: {
            equals: 'No'
        }
    },
    proportion: {
        type: type.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            max: 1,
        },
    },
});
