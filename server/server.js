var morgan = require('morgan');
var express = require('express');
var body_parser = require('body-parser');
var passport = require('./controllers/passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var Profile = require('./models/profileModel');
var util = require('./Utilities/utilities');
var app = express();

require('passport');

var isAuthorized = function(req, res, next){
  if (req.isAuthenticated()) {
     next();
    }
    res.sendStatus(401);
};

/////////////////// Serving Assets | Configuring MiddleWare //////////////////

  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(body_parser.urlencoded({extended : true}));
  app.use(body_parser.json());
  app.use(expressSession({ secret: 'ABS', cookie: {}}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static('public'));

//////////////////////////// API Endpoints //////////////////////////////////


  app.post('/api/signin', function(req, res, next) {
         passport.authenticate('local', function( err, user, info ) {
          if(user === false) {
            res.redirect('/api/signin');
          } else {
            req.login(user.dataValues, function(err) {
              if(err) {
                console.log('Error: ---', err);
              }
            });
            res.sendStatus(200);
          }
         })(req, res, next);
       });


  //Temporary 200 pending further configuration
  app.use('/api/browse', isAuthorized, function (req, res) {
    res.sendStatus(200);
  });

  //Temporary 200 pending further configuration
  // app.use('/api/signin', function(req, res){
  //   res.sendStatus(200);
  // });

  app.post('/api/signout', function(req, res){
    // Initializing response to 200 pending passport integration

    // To remove req.user and destroy the passport session
    req.logout();

    // Destroying express session
    req.session.destroy();

    // Ensuring user is logged out of passport
    if(req.session) {
      console.log('didnt work sucker');
    } else {
      console.log('worked sucker');
    }
    res.sendStatus(204);
  });

  app.post('/api/profile/create',
            util.checkUsername,
            util.createUser);

  app.use('/api/vote', isAuthorized, function (req, res){
    res.sendStatus(200);
  });

  app.use('/api/profile/:id', function (req, res) {
    if (req.params.id  == 20) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  app.use('/', function( req, res ){
    res.sendStatus(200);
  });

//Server SetUp
app.listen(3333);
module.exports = app;


   //
  //  function(req, res){
  //    Profile.find({where:{username: req.body.username}}).then(function(user){
  //      if (user !== null){
  //        res.sendStatus(451);
  //      } else {
  //        Profile.create({username  : req.body.username,
  //          password  : req.body.password,
  //          firstName : req.body.firstName,
  //          lastName  : req.body.lastName,
  //          email     : req.body.email
  //        })
  //        .then(function() {
  //          console.log('User created');
  //          res.sendStatus(200);
  //        })
  //        .catch(function(err) {
  //          console.log('Error in creation: ', err);
  //        });
  //      }
  //    })
