var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var db = require('../models/schema');
var update = require('./update');

///////////// Authentication Related Utilities //////////////
module.exports.authenticateUser = function (req, res, next, passport) {
  passport.authenticate('local', function( err, user, info ) {
    if(user === false) {
      res.sendStatus(404);
    } else if (err) {
      res.send(404);
    } else {
      req.login(user.dataValues, function(err) {
        if(err) {
          console.log('Error: ---', err);
          res.status(401).send(err);
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
    return db.Profile.find({ where : { id : userid }});
  } else {
    if (userid !== null) {
      return db.Profile.find({ where : { id : userid }});
        //return the user data that is public
    } else {
      return db.Profile.find({ where : { username : username }});
    }
  }
};

module.exports.checkUsername = function (req, res, next) {
  var username = req.body.username;
  db.Profile.find({ where: { username : username }})
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
  var username = req.body.username;
  var password = req.body.password;

  var userObj = {
    username  : username,
    password  : password,
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    email     : req.body.email
  };

  module.exports.hashPassword(username, password)
    .then(function(hash){
      userObj.password = hash;
      return userObj;
    })
    .then(function(user) {
      return db.Profile.create(user)
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
  return db.Profile
          .findAll({ attributes : ['id', 'username']})
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

module.exports.updateUser = function (req, res, next) {
  var updates = [];
  var userID = req.user.get('id');

  for (prop in req.body) {
    updates.push(update[prop](userID, req.body[prop]));
  }

  Promise.all(updates)
         .then(function(updates){
           res.send(200);
         })
         .catch(function(err) {
           console.log('Error in updating user', err);
           res.send(401);
         });
};

module.exports.deleteUser = function (req, res, next) {
  var userid = req.user.dataValues.id;
  db.Profile.destroy({ where : { id : userid }})
         .then(function(user) {
           console.log(user);
           res.sendStatus(200);
         })
         .catch(function(err) {
           res.status(404).end(err);
           throw new Error('Error is ', err);
         });
};

///////////////// Password Related Utilities ////////////////
module.exports.checkPassword = function(id, password) {
  return this.getProfile(null, id)
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

module.exports.hashPassword = function (username, password) {
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
};

/////////////// Voting //////////////////
module.exports.createOrUpdateVote = function (req, res, next) {
  console.log('!!!!!!!!', req.params.id);
  db.Vote.findOrCreate({
    where: {
      Votee: req.params.id
    }
  })
  .then(function (vote) {
    return db.Vote.update(
      { 
        trait1: vote[0].dataValues.trait1 + parseInt(req.body.extroversion),
        trait2: vote[0].dataValues.trait2 + parseInt(req.body.introversion),
        trait3: vote[0].dataValues.trait3 + parseInt(req.body.thinking),
        trait4: vote[0].dataValues.trait4 + parseInt(req.body.feeling),
        trait5: vote[0].dataValues.trait5 + parseInt(req.body.planning),
        trait6: vote[0].dataValues.trait6 + parseInt(req.body.spontaneous),
        trait7: vote[0].dataValues.trait7 + parseInt(req.body.leader),
        trait8: vote[0].dataValues.trait8 + parseInt(req.body.doEr),
        trait9: vote[0].dataValues.trait9 + parseInt(req.body.approachability),
        trait10: vote[0].dataValues.trait10 + parseInt(req.body.loneWolf),
        trait11: vote[0].dataValues.trait11 + parseInt(req.body.verbalCommunicator),
        trait12: vote[0].dataValues.trait12 + parseInt(req.body.actionCommunicator)
      },
      {where: {Votee: req.params.id}}
    );
  })
  .then(function () {
    return db.VoterAndVotee.create({VoterId: req.session.passport.user, VoteeId: req.params.id});
  })
  .then(function () {
    res.status(200).end('Vote created');
  })
  .catch(function (err) {
    console.error('ERROR in createOrUpdateVote: ', err);
  });
};

module.exports.isVoted = function (req, res, next) {
  db.VoterAndVotee.findOne({where: {VoterId: req.session.passport.user, VoteeId: req.params.id}})
  .then(function (user) {
    if (user) {
      res.status(401);
    } else {
      next();
    }
  })
  .catch(function (err) {
    console.error("ERROR in isVoted: ", err);
  });
};
