// var db = require('../../DB/db.js');
// var Sequelize = require('sequelize');
// var Profile = require('./profileModel.js');

// var Vote = db.define('vote', {
//   trait1: {
//     type: Sequelize.INTEGER,
//     field: 'Punctuality'
//   },
//   trait2: {
//     type: Sequelize.INTEGER,
//     field: 'trait_name2'
//   },
//   trait3: {
//     type: Sequelize.INTEGER,
//     field: 'trait_name3'
//   },
//   trait4: {
//     type: Sequelize.INTEGER,
//     field: 'trait_name4'
//   },
//   trait5: {
//     type: Sequelize.INTEGER,
//     field: 'trait_name5'
//   },
//   trait6: {
//     type: Sequelize.INTEGER,
//     field: 'trait_name6'
//   },
//   trait7: {
//     type: Sequelize.INTEGER,
//     field: 'trait_name7'
//   },
//   trait8: {
//     type: Sequelize.INTEGER,
//     field: 'trait_name8'
//   }
// }, {
//   freezeTableName: true
// });

// Profile.hasMany(Vote, {foreignKey: 'voter'});
// Vote.belongsTo(Profile, {foreignKey: 'voter'});
// Profile.hasMany(Vote, {foreignKey: 'votee'});
// Vote.belongsTo(Profile, {foreignKey: 'votee'});

// Vote.sync();
// Profile.sync();

// module.exports = Vote;
