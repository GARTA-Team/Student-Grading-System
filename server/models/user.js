module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      allowNull: false,
      validate: {
        len: [5, 20]
      }
    },
    pass: {
      type: type.STRING,
      allowNull: false
    },
    session_id: {
      type: type.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: type.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    }
  });
};
