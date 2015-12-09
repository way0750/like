var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/profileModel');

console.log('Loading passport.js');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('username: ', username);
    console.log('password: ', password);
    console.log('In passport');
    User.find({where:{username : username}})
        .then(function(user, err) {
            console.log('Found!');
            if ( err ) {
              console.log('Error');
              return err;
            }
            if ( !user ) {
              console.log('User not found');
              return done( null, false, { message : 'Incorrect username' } );
            }
            // if ( !user.validPassword( password )) {
            //   return done( null, false, { message : 'Incorrect password.'});
            // }
            // 
            // return  done(null, user);
            return done( null, user );
         });
  }
 ));

passport.serializeUser(function(user, callback) {
  console.log('in serialize: ', user);
  callback(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  console.log('in deserialize: ', id);
  User.findById(id).then(function(user, err) {
    cb(null, user);
  });
});

module.exports = passport;