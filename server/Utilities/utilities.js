var Profile = require('../models/profileModel');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

////////////////// User Related Utilities //////////////////
module.exports.getProfile = function (username) {
  return new Promise(function(resolve, reject){
    Profile.find({ where : { username : username }})
           .then(function(user){
              if (!user) {
                throw new Error("User not found");
              } else {
                resolve(user);
              }
           });
  });
};

module.exports.checkUsername = function (req, res, next) {
  var username = req.body.username;
  return Profile.find({ where: { username : username }})
        .then(function(user) {
          next();
        })
        .catch(function(err){
          res.sendStatus(451);
        });
}

module.exports.createUser = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var userObj = {
    username  : username,
    password  : '',
    firstName : req.body.firstName,
    lastName  : req.body.lastName,
    email     : req.body.email
  };

  hashPassword(username, password)
          .then(function(hash){
            userObj.password = hash;
            Profile.create(userObj)
                   .then(function(user) {
                     req.login(user.dataValues, function(err) {
                       if(err) {
                         console.log('Error: ---', err);
                       }
                     });
                     res.send(200); //next()
                   });
          })
          .catch(function(err){
            console.log('Error: ',err);
            res.send(451);
          });
};


///////////////// Password Related Utilities ////////////////
module.exports.checkPassword = function(username, password) {
  return this.getProfile(username)
             .then(function(user){
               var username = user.dataValues.username;
               var pwd = user.dataValues.password;
               console.log('username: ',username);
               console.log('password: ', pwd);
               bcrypt.compareAsync(password, pwd)
                     .then(function(err, result) {
                       return result;
                     });
             });
};

function hashPassword (username, password) {
  console.log(password);
  return new Promise (function(resolve, reject) {
    bcrypt.genSaltAsync(8)
        .then(function(salt) {
          return bcrypt.hashAsync(password ,salt);
        })
        .then(function(hash) {
          return hash;
        })
        .catch(function(err){
          reject(err);
        });
  });
}

// TODO: Write checkUsername function

// TODO: Write to potential features
          //Autocomplete feature to check valid usernames
          //as prospective user is signing up (real-time data from db)

// TODO: Write to notes. txt
            //When reading source code, start with only the functions
            //you're intending to use. Ignore complexity.

            //Look at a library's usage history. If its issue history
            //
