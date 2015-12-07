angular.module('like.service', ['like'])
.factory('authService', function ($http) {
  var login = function (userObj) {
   $http({
    method : 'post',
    url : '/api/login',
    data : userObj
   });
  };
  return {login: login};
});
