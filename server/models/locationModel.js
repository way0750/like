var db = require('../../DB/db.js');
var Sequelize = require('sequelize');

var Loc = db.define('loc', {
  locName: {
    type: Sequelize.STRING,
    field: 'location_name'
  }
}, {
  freezeTableName: true
});

//TODO: create relationships before running sync
Loc.sync({force: true});

module.exports = Loc;