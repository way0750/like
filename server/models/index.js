var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var dbPath = process.env.DATABASE_URL || 'postgres://yjzlsdlebggohn:hcD3bs1xVUEjgx4E63ezx3388P@ec2-54-204-12-25.compute-1.amazonaws.com:5432/d5lunrgkvjdsdo';
var sequelize = new Sequelize(dbPath);
var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
