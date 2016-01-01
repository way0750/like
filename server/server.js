console.oldLog = console.log;
console.log = function () {
  console.oldLog('\n\nconsole.logging this..=======================');
  console.oldLog.apply(console, arguments);
  console.oldLog('\n\n^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^\n\n');
};

var morgan = require('morgan');
var express = require('express');
var body_parser = require('body-parser');
var passport = require('./controllers/passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
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

app.param('previewID', function (req, res, next, id) {
  var quickPreviewObj = {};
  quickPreviewObj.justQuicky = true;
  util.getProfile(null, id)
  .then( function (user) {
    quickPreviewObj.firstName = user.dataValues.firstName;
    quickPreviewObj.lastName = user.dataValues.lastName;
    res.quick = quickPreviewObj;
    util.getVoteData(id)
    .then(function (data) {
      quickPreviewObj.vote = data;
      next();
    })
    .catch( function (err) {
      //err most likely to be no voting record for this person found.
      next();
    });
  })
  .catch(function () {
    res.send(404);
  });
});

app.get('/api/quickPreview/:previewID', function (req, res, next) {
  res.send(res.quick);
});

app.get('/api/loginStatus', util.currentlyLoggedIn);

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

app.post('/api/profile/', util.checkUsername, util.createUser);
app.put('/api/profile/', util.isAuthorized, util.updateUser);
app.delete('/api/profile/', util.isAuthorized, util.deleteUser);

app.post('/api/profile/:id', util.isAuthorized, util.isVoted, util.createOrUpdateVote);

app.get('/api/profile/:id', util.isAuthorized, util.isVoted, function (req, res) {
  profileID = req.params.id;
  var profileData = {vote: {}};
  util.getProfile(null, profileID)
      .then(function(user){
        profileData.lastName = user.dataValues.lastName;
        profileData.firstName = user.dataValues.firstName;
        return util.getVoteData(profileID);
      })
      .then(function (vote) {
        profileData.isVoted = res.isVoted;
        profileData.vote = vote;
        return res.status(200).send(profileData);
      })
      .catch(function(err){
        return res.status(404).send(profileData);
      });
  // Just return the user object associated with id
  // This should send public profile
});

app.use('/', function( req, res ){
  console.log('at root');
  res.sendStatus(200);
});

//Server SetUp
app.listen(process.env.PORT || 3333);
module.exports = app;
