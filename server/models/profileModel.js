var db = require('../../DB/db.js');
var Sequelize = require('sequelize');

var Profile = db.define('profile', {
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  password: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name'
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  }
}, {
  freezeTableName: true
});

//TODO: create relationships before running sync
Profile.sync();

module.exports = Profile;
