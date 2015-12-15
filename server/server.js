var morgan = require('morgan');
var express = require('express');
var body_parser = require('body-parser');
var passport = require('./controllers/passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var Profile = require('./models/profileModel');
var util = require('./Utilities/utilities');
var app = express();


/////////////////// Serving Assets | Configuring MiddleWare //////////////////

app.use(morgan('dev'));
app.use(cookieParser());
app.use(body_parser.urlencoded({extended : true}));
app.use(body_parser.json());
app.use(expressSession({ secret: 'ABS', cookie: {}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

//////////////////////// API Endpoints ////////////////////////////

app.post('/api/signin', function(req, res, next) {
  util.authenticateUser(req, res, next, passport);
  //should check and see if user even exit
  //should return private profile on successful login
});

//TODO : add more to route, only checking to see if user is authenticated
app.get('/api/browse', util.isAuthorized, function(req, res) {
  util.getAllProfiles()
      .then(function(users){
        res.status(200).send(users);
      })
      .catch(function(err){
        console.log('Error in api/browse', err);
        res.sendStatus(404);
      });
});

app.post('/api/signout', util.signUserOut);

app.post('/api/profile/create', util.checkUsername, util.createUser);

//TODO : add more to route, only checking to see if user is authenticated
app.use('/api/vote', util.isAuthorized, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/profile/:id', util.isAuthorized, function (req, res) {
  var profileID = req.params.id;
  util.getProfile(null, profileID)
      .then(function(user){
        res.status(200).send(user.dataValues);
      })
      .catch(function(err){
        res.sendStatus(404);
      });
  // Just return the user object associated with id
  // This should send public profile
});

app.use('/', function( req, res ){
  console.log('at root');
  res.sendStatus(200);
});

//Server SetUp
app.listen(3333);
module.exports = app;
