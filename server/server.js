var morgan = require('morgan');
var express = require('express');
var body_parser = require('body-parser');
var passport = require('./controllers/passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var app = express();

require('passport');


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
              console.log('req object contains session: ', req.session);
              console.log('req object contains passport: ', req.session.passport);
               passport.authenticate('local', function( err, user, info ) {
                console.log('user is: ', user);
                if(user === false) {
                  res.redirect('/api/signin');
                } else {
                  req.login(user.dataValues, function(err) {
                    if(err) {
                      console.log('Error: ', err);
                    } else {
                      console.log('Passport session object: ', req.session.passport);
                      console.log('req.user exists: ', req.user);
                    }
                  });
                  res.sendStatus(200);
                }
               })(req, res, next);
             });

  app.use('/api/profile/:id', function (request, response) {
    if (request.params.id  == 20) {
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });

  //Temporary 200 pending further configuration
  app.use('/api/browse', function (request, response) {
    console.log('req.session', request.session);
     response.sendStatus(200);
  });

  //Temporary 200 pending further configuration
  app.use('/api/signin', function(req, res){
    res.sendStatus(200);
  });

  app.post('/api/signout', function(req, res){
    // Initializing response to 200 pending passport integration

    // To remove req.user and destroy the passport session
    req.logout();

    // Destroying express session
    req.session.destroy();

    // Ensuring user is logged out of passport
    console.log('cookie: ', req.session);
    if(req.session) {
      console.log('didnt work sucker');
    } else {
      console.log('worked sucker');
    }
    res.redirect('/api/signin');
  });

  app.use('/api/user/create', function(req, res){
    res.sendStatus(200);
  });

  app.use('/api/vote', function (req, res){
    res.sendStatus(200);
  });

  app.use('/', function( req, res ){
    res.sendStatus(200);
  });

//Server SetUp
app.listen(3333);
module.exports = app;