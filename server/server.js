var morgan = require('morgan');
var express = require('express');
var body_parser = require('body-parser');
var passport = require('./controllers/passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var util = require('./Utilities/utilities');
var app = express();
var db = require('./models');

// customized logging system
console.oldLog = console.log;
console.log = function () {
  console.oldLog('\n\nconsole.logging this..=======================');
  console.oldLog.apply(console, arguments);
  console.oldLog('\n\n^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^\n\n');
};

// set up server and authentication
app.use(morgan('dev'));
app.use(cookieParser());
app.use(body_parser.urlencoded({extended : true}));
app.use(body_parser.json());
app.use(expressSession({ secret: 'ABS', cookie: {}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// set up routes
require('./routes')(app, util, passport);

// set up database
db.sequelize.sync().then(function () {
  var server = app.listen(process.env.PORT || 3333, function() {
    console.log('Express server listening on port 3333');
  });
});

module.exports = app;
