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
        autoIncrement: true,
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
        validate: {
            notEmpty: true,
            notNull : true,
            max: 1,
        }, 
    },
});
