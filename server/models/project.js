module.exports = (sequelize, type) => sequelize.define("project", {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: type.STRING,
  summary: type.STRING,
  date_created: type.DATE,
  last_modified: type.DATE,
  deadline: type.DATE,
  status: type.STRING,
  grading: type.INTEGER,
});
