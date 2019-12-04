const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
module.exports = (sequelize, type) => {
  let User = sequelize.define("user", {
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
  User.addHook("beforeCreate", (user, options) => {
    user.pass = bcrypt.hashSync(
      user.pass,
      bcrypt.genSaltSync(saltRounds),
      null
    );
    console.log("hashed before");
  });
  return User;
};
