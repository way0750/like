var Profile = require('../models/profileModel');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var Vote = require('../models/voteModel');

///////////// Authentication Related Utilities //////////////
module.exports.authenticateUser = function (req, res, next, passport) {
  passport.authenticate('local', function( err, user, info ) {
    if(user === false) {
      res.sendStatus(404);
    } else {
      req.login(user.dataValues, function(err) {
        if(err) {
          console.log('Error: ---', err);
        }
      });
      res.status(200).send(user.dataValues);
    }
  })(req, res, next);
};

module.exports.isAuthorized = function(req, res, next){
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
};


////////////////// User Related Utilities //////////////////
module.exports.getProfile = function (username, userid, privy) {
  if (privy) {
    return Profile.find({ where : { id : userid }});
  } else {
    if (userid !== null) {
      return Profile.find({ where : { id : userid }})
        //return the user data that is public
    } else {
      return Profile.find({ where : { username : username }});
    }
  }
};

module.exports.checkUsername = function (req, res, next) {
  var username = username;
  Profile.find({ where: { username : username }})
    .then(function(user) {
      if(user === null) {
        next();
      } else {
        res.sendStatus(451);
      }
    })
    .catch(function(err){
      res.sendStatus(451);
    });
};

module.exports.createUser = function (req, res) {
  var username = username;
  var password = password;

  var userObj = {
    username  : username,
    password  : password,
    firstName : firstName,
    lastName  : lastName,
    email     : email
  };

  hashPassword(username, password)
    .then(function(hash){
      userObj.password = hash;
      return userObj;
    })
    .then(function(user) {
      return Profile.create(user)
        .then(function(user) {
          return user;
        });
    })
    .then(function(user) {
      req.login(user.dataValues, function(err) {
        if(err) {
          throw new Error('Error in logging in user...', err);
        }
      });
      res.sendStatus(200);
    })
    .catch(function(err){
      console.log('Error in creating User... ',err);
      res.send(451);
    });
};

module.exports.signUserOut = function (req, res, next) {
  // To remove req.user and destroy the passport session
  req.logout();
  req.session.destroy();
  res.redirect('http://www.google.com');
};

module.exports.getAllProfiles = function () {
  return Profile.findAll({ attributes : ['id', 'username']})
                .then(function(users){
                  var profiles = [];
                  for(var i =0; i < users.length; i++ ) {
                    profiles.push(users[i].dataValues);
                  }
                  return profiles;
                })
                .catch(function(err) {
                  throw new Error('Error getting new users',err);
                });
};

// Model.findAll({
//   attributes: ['id', 'foo', 'bar', 'baz', 'quz', [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
// });


///////////////// Password Related Utilities ////////////////
module.exports.checkPassword = function(username, password) {
  return this.getProfile(username, null)
    .then(function(user){
      var username = user.dataValues.username;
      var pwd = user.dataValues.password;
      return bcrypt.compareAsync(password, pwd)
        .then(function(result) {
          return result;
        });
  })
  .catch(function(err) {
    console.log('err in checkPassword', err);
  });
};

function hashPassword (username, password) {
  return bcrypt.genSaltAsync(8)
    .then(function(salt) {
      return bcrypt.hashAsync(password, salt);
    })
    .then(function(hash) {
      return hash;
    })
    .catch(function(err){
      throw new Error('Error in hashing password...', err);
    });
}

/////////////// Voting //////////////////
module.exports.createOrUpdateVote = function (treats, voter, votee) {
  Vote.findOrCreate({
    where: {
      voter: voter,
      votee: votee
    }, 
    defaults: {
      treat1: treats.treat1,
      treat2: treats.treat2,
      treat3: treats.treat3,
      treat4: treats.treat4,
      treat5: treats.treat5,
      treat6: treats.treat6,
      treat7: treats.treat7,
      treat8: treats.treat8,
      voter: voter,
      votee: votee
    }
  })
  .spread(function (user, created) {
    if (!created) {
      User.update({
        treat1: treats.treat1,
        treat2: treats.treat2,
        treat3: treats.treat3,
        treat4: treats.treat4,
        treat5: treats.treat5,
        treat6: treats.treat6,
        treat7: treats.treat7,
        treat8: treats.treat8
      },
      {
        where: {
          voter: user.voter,
          votee: user.votee
        }
      });
    }
  });
};
