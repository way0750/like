(function () {
  'use strict';

  angular.module('like.services', [])
  .factory('authService', function ($http) {
    var login = function (userObj) {
     return $http({
      method: 'POST',
      url: '/api/user/signin',
      data: userObj
      //useObj: {username: username, password: password}
     });
    };
    var logout = function () {};
    return {
      login: login,
      logout : logout
    };
  })
  .factory('dashboardService', function ($http) {
    var getLogedInUserData = function (userId) {
      var url = '/api/profile/' + userId;
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
        url: '/api/user/signout'
        //{}
      });
    };

    var getUserData = function (userId) {
      var url = '/api/profile/' + userId;
      return $http({
        method: 'GET',
        url: url
      })
      .then(function (data) {
        return data;
      }).catch(function () {
        return false;
      });
    };

    return {
      getUserData: getUserData,
      logOut: logOut,
      getLogedInUserData: getLogedInUserData
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

    var sendVote = function () {

    };

    return {getAllUsers: getAllUsers};
  });
})();
