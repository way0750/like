(function () {
  'use strict';

  angular.module('like.services', [])
  .factory('authService', function ($http) {
    var login = function (userObj) {
     return $http({
      method: 'post',
      url: '/api/login',
      data: userObj
     });
    };
    return {login: login};
  })
  .factory('dashboardService', function ($http) {
    var getUserData = function (userId) {
      var url = '/api/users/' + userId;
      return $http({
        method: 'GET',
        url: url
      })
      .then(function (data) {
        return data;
      });
    };

    var logOut = function () {
      return $http({
        method: 'POST',
        url: '/api/logout'
      });
    };

    return {
      logOut: logOut,
      getUserData: getUserData
    };
  })
  .factory('browseService', function ($http) {
    var getAllUsers = function (region) {
      return $http({
        method: 'GET',
        url: '/api/browse'
      })
      .then(function (data) {
        return data;
      });
    };
    return {getAllUsers: getAllUsers};
  });
})();
