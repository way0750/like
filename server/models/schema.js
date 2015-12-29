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
  email: {
    type: Sequelize.STRING,
    field: 'email'
  }
}, {
  freezeTableName: true
});

var Vote = db.define('Vote', {
  trait1: {
    type: Sequelize.INTEGER,
    field: 'Extroversion',
    defaultValue: 0
  },
  trait2: {
    type: Sequelize.INTEGER,
    field: 'Introversion',
    defaultValue: 0
  },
  trait3: {
    type: Sequelize.INTEGER,
    field: 'Thinking',
    defaultValue: 0
  },
  trait4: {
    type: Sequelize.INTEGER,
    field: 'Feeling',
    defaultValue: 0
  },
  trait5: {
    type: Sequelize.INTEGER,
    field: 'Planning',
    defaultValue: 0
  },
  trait6: {
    type: Sequelize.INTEGER,
    field: 'Spontaneous',
    defaultValue: 0
  },
  trait7: {
    type: Sequelize.INTEGER,
    field: 'Leader',
    defaultValue: 0
  },
  trait8: {
    type: Sequelize.INTEGER,
    field: 'Do-er',
    defaultValue: 0
  },
  trait9: {
    type: Sequelize.INTEGER,
    field: 'Approachability',
    defaultValue: 0
  },
  trait10: {
    type: Sequelize.INTEGER,
    field: 'LoneWolf',
    defaultValue: 0
  },
  trait11: {
    type: Sequelize.INTEGER,
    field: 'Verbal communicator',
    defaultValue: 0
  },
  trait12: {
    type: Sequelize.INTEGER,
    field: 'Action communicator',
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
