var Profile = require('../models/profileModel');
var util = require('./utilities');

module.exports.username = function (id, username) {
  return Profile.update({ username : username},
                        { where : { id : id}})
                .then(function() {
                  console.log('update arguments', arguments)
                })
}
module.exports.password  = function (id, password) {
  var username;
  password = JSON.parse(password);
  return Profile
         .find({id : id})
         .then(function(user){
            username = user.get('username');
            return util.checkPassword(id, password.old);
          })
          .then(function(correct) {
            if (correct) {
              return util.hashPassword(username, password.new)
                         .then(function(hash){
                           console.log('new hash', hash)
                           Profile.update({ password : hash },{ where :{ id : id }})
                         })
            } else {
              throw new Error('Error, incorrect password');
            }
          })

}
module.exports.firstName = function(id, firstName) {
  return Profile.update({ firstName : firstName},
                        { where : { id : id}});

}
module.exports.lastName = function (id, lastName) {
  return Profile.update({ lastName : lastName},
                        { where : { id : id}});

}
module.exports.email = function (id, email) {
  return Profile.update({ email : email},
                        { where : { id : id}});
}
