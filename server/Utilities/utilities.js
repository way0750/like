var Profile = require('../models/profileModel');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var Vote = require('../models/voteModel');
var update = require('./update');

///////////// Authentication Related Utilities //////////////
module.exports.authenticateUser = function (req, res, next, passport) {
  passport.authenticate('local', function( err, user, info ) {
    if(user === false) {
      res.sendStatus(404);
    } else if (err) {
      res.send(404)
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
  var username = req.body.username;
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
  var username = req.body.username;
  var password = req.body.password;

  var userObj = {
    username  : username,
    password  : password,
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    email     : req.body.email
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
  return Profile
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
           res.send(520);
         })
}

module.exports.deleteUser = function (req, res, next) {

}
// Model.findAll({
//   attributes: ['id', 'foo', 'bar', 'baz', 'quz', [sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
// });


///////////////// Password Related Utilities ////////////////
module.exports.checkPassword = function(id, password) {
  return this.getProfile(null, id)
    .then(function(user){
      console.log('user', user);
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
}

/////////////// Voting //////////////////
module.exports.createOrUpdateVote = function (traits, voter, votee) {
  Vote.findOrCreate({
    where: {
      voter: voter,
      votee: votee
    },
    defaults: {
      trait1: traits.trait1,
      trait2: traits.trait2,
      trait3: traits.trait3,
      trait4: traits.trait4,
      trait5: traits.trait5,
      trait6: traits.trait6,
      trait7: traits.trait7,
      trait8: traits.trait8,
      voter: voter,
      votee: votee
    }
  })
  .spread(function (user, created) {
    if (!created) {
      User.update({
        trait1: traits.trait1,
        trait2: traits.trait2,
        trait3: traits.trait3,
        trait4: traits.trait4,
        trait5: traits.trait5,
        trait6: traits.trait6,
        trait7: traits.trait7,
        trait8: traits.trait8
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
