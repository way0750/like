(function() {
  'use strict';

  angular.module('like.service', [])
  .factory('authService', function ($http) {
    var login = function (userObj) {
     $http({
      method: 'post',
      url: '/api/login',
      data: userObj
     });
    };
    return {login: login};
  })

  .factory('dashboardService', function ($http) {
    var getUserData = function () {
      $http({
        method: 'GET',
        url: '/api/dashboard'
      });
    };
  })

  .factory('browseService', function ($http) {
    var getUsers = function (region) {
      $http({
        method: 'GET',
        url: '/api/browse/'
      });
    };
    return {getUsers: getUsers};
  });
})();
