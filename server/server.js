var morgan = require('morgan');
var express = require('express');
var body_parser = require('body-parser');
var passport = require('./controllers/passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var Profile = require('./models/profileModel');
var util = require('./Utilities/utilities');
var app = express();
// require('passport');
// var isAuthorized = function(req, res, next){
//   if (req.isAuthenticated()) {
//      next();
//     }
//     res.sendStatus(401);
// };

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
});

//TODO : add more to route, only checking to see if user is authenticated
app.use('/api/browse', util.isAuthorized, function(req, res) {
  res.sendStatus(200);
});

app.post('/api/signout', util.signUserOut);

app.post('/api/profile/create', util.checkUsername, util.createUser);

//TODO : add more to route, only checking to see if user is authenticated
app.use('/api/vote', util.isAuthorized, function(req, res) {
  res.sendStatus(200);
});

app.use('/api/profile/:id', util.isAuthorized, function (req, res) {
  res.sendStatus(200);
});

app.use('/', function( req, res ){
  res.sendStatus(200);
});

//Server SetUp
app.listen(3333);
module.exports = app;
