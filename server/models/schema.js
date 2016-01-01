var db = require('../../DB/db.js');
var Sequelize = require('sequelize');

var Profile = db.define('Profile', {
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
  gender: {
    type: Sequelize.STRING,
    field: 'gender'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  }
}, {
  freezeTableName: true
});

var Vote = db.define('Vote', {
  extroversion: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  introversion: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  thinking: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  feeling: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  planning: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  spontaneous: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  leader: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  doEr: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  approachability: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  loneWolf: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  verbalCommunicator: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  actionCommunicator: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  freezeTableName: true
});

var VoterAndVotee = db.define('VoterAndVotees', {});

Profile.hasMany(Vote, {foreignKey: 'Votee'});
Vote.belongsTo(Profile, {foreignKey: 'Votee'});

Profile.belongsToMany(Profile, {as: "Voter", through: "VoterAndVotees", foreignKey: "VoteeId"});
Profile.belongsToMany(Profile, {as: "Votee", through: "VoterAndVotees", foreignKey: "VoterId"});

db.sync();

exports.Profile = Profile;
exports.Vote = Vote;
exports.VoterAndVotee = VoterAndVotee;
