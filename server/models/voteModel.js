module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    extroversion: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    introversion: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    thinking: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    feeling: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    planning: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    spontaneous: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    leader: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    doEr: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    approachability: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    loneWolf: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    verbalCommunicator: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    actionCommunicator: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    freezeTableName: true,
    classMethods: {
        associate: function(models) {
          Vote.belongsTo(models.Profile, {foreignKey: 'Votee'});
        },
      }
  });
  return Vote;
};
