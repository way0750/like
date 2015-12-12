var db = require('./DB/db');
var User = require('./server/models/profileModel');
var bcrypt = require('bcrypt');

var passHash = bcrypt.hashSync('test', 8);

User.create({ username : 'John',
              password: passHash});

// User.create({ username : 'Sally' });
