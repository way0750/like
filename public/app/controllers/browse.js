(function () {
  'use strict';

  angular.module('like.browse', [])
  .controller('browseCtrl', ['$scope', 'browseService', function ($scope, browseService) {
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

    $scope.getAllUsers();
  }]);
})();
