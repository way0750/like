var db = require('../../DB/db.js');
var Sequelize = require('sequelize');

var Vote = db.define('vote', {
  voteDirection: {
    type: Sequelize.BOOLEAN,
    field: 'vote_direction'
  }
}, {
  freezeTableName: true
});

//TODO: create relationships before running sync
Vote.sync({force: true});

module.exports = Vote;