(function () {
  'use strict';

  angular.module('like.login')
  .factory('authService', ['$http', function ($http) {
    var logIn = function (userObj) {
     return $http({
      method: 'POST',
      url: '/api/signin',
      data: userObj
     });
    };

    var logOut = function () {
      return $http({
        method: 'POST',
        url: '/api/signout'
      });
    };

    var register = function (useObj) {
      return $http({
        method: 'POST',
        url: '/api/profile/',
        data: useObj
      });
    };
////need to test this with server
    var update = function (userDataObj) {
      return $http({
        method: 'PUT',
        url: 'api/profile/',
        data: userDataObj
      }).then(function (data) {
        return data;
      }).catch(function (data) {
        return data;
      });
    };

////need to test this with server
    var deleteUser = function (userId) {
      return $http({
        method: 'DELETE',
        url: 'api/profile/'
      }).then(function (data) {
        return data;
      }).catch(function (data) {
        return data;
      });
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
