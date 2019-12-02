module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: type.STRING,
    pass: type.STRING,
    session_id: type.STRING,
    email: type.STRING
  });
};
