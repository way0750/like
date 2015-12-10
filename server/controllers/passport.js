var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/profileModel');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.find({where:{username : username}})
        .then(function(user, err) {
            console.log('Found!');
            if ( err ) {
              console.log('Error');
              return err;
            }
            if ( !user ) {
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
  callback(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id).then(function(user, err) {
    cb(null, user);
  });
});

module.exports = passport;