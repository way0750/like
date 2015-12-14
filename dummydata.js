var db = require('./DB/db');
var User = require('./server/models/profileModel');
var bcrypt = require('bcrypt');

var passHash = bcrypt.hashSync('test', 8);

User.create({ username : 'John',
              password: passHash});


User.findAll({ attributes : ['id', 'username']})
                .then(function(users){
                  var profiles = [];;
                  for(var i =0; i < users.length; i++ ) {
                    profiles.push(users[i].dataValues)
                  }
                  console.log(profiles);
                })
                .catch(function(err) {
                  console.log(err);
                });



// User.create({ username : 'Sally' });

// var fnames = ['Jose', 'David', 'Mike', 'Jordan', 'Brett'];

// var lnames = ['Johnson', 'Davidson', 'Favre', 'VanDeCamp', 'Doleson'];

// var domains = ['netscape.com', 'aol.com', 'gmail.com', 'hotmail.com', 'hr.net'];

// var firstNames = [];
// var lastNames = [];
// var emails = [];
// var usernames = [];
// var passwords = [];
// var first_name = '';
// var last_name = '';
// var domain = '';

// for(var i =1; i <= 20; i++) {
//   for(var j = 0; j < 5; j ++) {
//     first_name = fnames[(Math.floor(Math.random() * 5))];
//     last_name = lnames[(Math.floor(Math.random() * 5))];
//     domain = domains[(Math.floor(Math.random() * 5))];
//     firstNames.push(first_name);
//     lastNames.push(last_name);
//     emails.push(firstNames + '@' + domain);
//     usernames.push(first_name + '' + ((j+1)*(i*5-5)));
//     passwords.push('test' + (j*i + 1)); 
//   }
// }

// console.log(firstNames);
// console.log(lastNames);
// console.log(emails);
// console.log(usernames);
// console.log(passwords);