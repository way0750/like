module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    username: {
      type: DataTypes.STRING,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email'
    },
    photo: {
      type: DataTypes.STRING,
      field: 'photo'
    }
  }, {
    freezeTableName: true,
    classMethods: {
        associate: function(models) {
          Profile.hasMany(models.Vote, {foreignKey: 'Votee'});
          Profile.belongsToMany(Profile, {as: "Voter", through: "VoterAndVotees", foreignKey: "VoteeId"});
          Profile.belongsToMany(Profile, {as: "Votee", through: "VoterAndVotees", foreignKey: "VoterId"});
        },
      }
  });
  return Profile;
};
