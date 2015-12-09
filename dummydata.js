var db = require('./DB/db');
var User = require('./server/models/profileModel');

User.create({ username : 'John'});

User.create({ username : 'Sally' });
