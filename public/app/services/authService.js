(function () {
  'use strict';

  angular.module('like')
  .factory('authService', ['$http', function ($http) {
    var logIn = function (userObj) {
     return $http({
      method: 'POST',
      url: '/api/user/signin',
      data: userObj
      //useObj: {username: username, password: password}
     });
    };

    var logOut = function () {
      return $http({
        method: 'POST',
        url: '/api/user/signout'
        //{}
      });
    };

    var register = function (useObj) {
      return $http({
        method: 'POST',
        url: '/api/user/create',
        data: useObj
        //useObj: {username: username, password: password}
      });
    };

    var update = function () {
    };

    var deleteUser = function () {
    };

    return {
      logIn: logIn,
      logOut: logOut,
      register: register,
      update: update,
      deleteUser: deleteUser
    };
  }]);
})();
