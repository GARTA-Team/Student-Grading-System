module.exports = (sequelize, type) => sequelize.define("ProjectData",{
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    projectId: {
        //foreignKey -> this should link the ProjectData table with Project table
        type: type.INTEGER,
        required: true,
        allowNull: false,
    },
    updateMessage: {
        type: type.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        },
    },
    createAt: {
        type : type.DATE,
    },
    updatedAt: {
        type : type.DATE,
    },
});