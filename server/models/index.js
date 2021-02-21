const config = require('../config.js');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: 3306,
  operatorsAliases: false,
  pool: config.pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.images = require("./image.model.js")(sequelize, Sequelize);
// db.profile_images = require("./profile_images.model.js")(sequelize, Sequelize);
db.tasks = require("./task.model.js")(sequelize, Sequelize);

module.exports = db;