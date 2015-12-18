var Profile = require('../models/profileModel');
var util = require('./utilities');

module.exports.username = function (id, username) {
  return Profile.update({ username : username},
                        { where : { id : id}});
}
module.exports.password = function (id, password) {
  console.log(typeof password);
  console.log(typeof JSON.parse(password));
  console.log(password)
  console.log('old',password.old)
  console.log('new',password.new)
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

// Post.update({
//   updatedAt: null,
// }, {
//   where: {
//     deletedAt: {
//       $ne: null
//     }
//   }
// });
