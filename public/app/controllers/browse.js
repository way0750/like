(function () {
  'use strict';

  angular.module('like.browse', ['ngCookies'])
  .controller('browseCtrl', ['$scope', 'browseService', '$location', '$cookies', function ($scope, browseService, $location, $cookies) {
    $scope.users = {};

    $scope.getAllUsers = function () {
      browseService.getAllUsers()
      .then(function (users) {
        $scope.users.data = users.data;
      })
      .catch(function (err) {
        console.error('BROWSE — GET USERS ERRORS:', err);
      });
    };

    $scope.toDashboard = function () {
      $location.path('/dashboard');
    };
    $scope.getAllUsers();
  }]);
})();
