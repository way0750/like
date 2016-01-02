var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var db = require('../models');
var update = require('./update');

// authentication
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

module.exports.signUserOut = function (req, res, next) {
  // To remove req.user and destroy the passport session
  req.logout();
  req.session.destroy();
  res.send(300);
};

// user creation
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
  // var gender = req.body.gender;
  var userObj = {
    username  : req.body.username,
    password  : req.body.password,
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    email     : req.body.email,
    gender    : req.body.gender
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

// user info modification
module.exports.updateUser = function (req, res, next) {
  var updates = [];
  //maybe should user another way to get id????
  // var userID = req.user.get('id');
  var userID = req.session.passport.user;


  for (var prop in req.body) {
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

// password
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

// get user data
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

// voting utilities
module.exports.createOrUpdateVote = function (req, res, next) {
  if (res.isVoted) {
    res.status(401).send('Already voted on this profile');
  } else {
    db.Vote.findOrCreate({
      where: {
        Votee: req.params.id
      }
    })
    .then(function (vote) {
      return db.Vote.update(
        { 
          extroversion: vote[0].dataValues.extroversion + parseInt(req.body.extroversion),
          introversion: vote[0].dataValues.introversion + parseInt(req.body.introversion),
          thinking: vote[0].dataValues.thinking + parseInt(req.body.thinking),
          feeling: vote[0].dataValues.feeling + parseInt(req.body.feeling),
          planning: vote[0].dataValues.planning + parseInt(req.body.planning),
          spontaneous: vote[0].dataValues.spontaneous + parseInt(req.body.spontaneous),
          leader: vote[0].dataValues.leader + parseInt(req.body.leader),
          doEr: vote[0].dataValues.doEr + parseInt(req.body.doEr),
          approachability: vote[0].dataValues.approachability + parseInt(req.body.approachability),
          loneWolf: vote[0].dataValues.loneWolf + parseInt(req.body.loneWolf),
          verbalCommunicator: vote[0].dataValues.verbalCommunicator + parseInt(req.body.verbalCommunicator),
          actionCommunicator: vote[0].dataValues.actionCommunicator + parseInt(req.body.actionCommunicator)
        },
        {where: {Votee: req.params.id}}
      );
    })
    .then(function () {
      db.VoterAndVotees.create({VoterId: req.session.passport.user, VoteeId: req.params.id})
      .then( function (newVote) {
        res.status(200).end('Vote created');
      });
    })
    .catch(function (err) {
    });
  }
};

module.exports.isVoted = function (req, res, next) {
  console.log('checking isVoted:', "VoterId", req.session.passport.user, "VoteeId", req.params.id);
  if (req.params.id === 'self') {
    req.params.id = req.session.passport.user;
  }
  db.VoterAndVotees.findOne({where: {"VoterId": req.session.passport.user, "VoteeId": req.params.id}})
  .then(function (user) {
    if (user) {
      res.isVoted = true;
    } else {
      res.isVoted = false;
    }
    next();
  })
  .catch(function (err) {
    console.error("ERROR in isVoted: ", err);
  });
};

module.exports.getVoteData = function (voteeId) {
  var vote = {};
  return db.Vote.findOne({where: {Votee: voteeId}})
  .then(function (data) {
    return data.dataValues;
  })
  .then(function (voteData) {
    vote.extroversion = voteData.extroversion;
    vote.introversion = voteData.introversion;
    vote.thinking = voteData.thinking;
    vote.feeling = voteData.feeling;
    vote.planning = voteData.planning;
    vote.spontaneous = voteData.spontaneous;
    vote.leader = voteData.leader;
    vote.doEr = voteData.doEr;
    vote.approachability = voteData.approachability;
    vote.loneWolf = voteData.loneWolf;
    vote.verbalCommunicator = voteData.verbalCommunicator;
    vote.actionCommunicator = voteData.actionCommunicator;
    return vote;
  });
};
