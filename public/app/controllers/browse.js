(function () {
  'use strict';

  angular.module('like.browse', [])
  .controller('browseCtrl', ['$scope', 'browseService', function ($scope, browseService) {
    $scope.users = {};

    var getAllUsers = function () {
      browseService.getAllUsers()
      .then(function (users) {
        $scope.users = users;
      })
      .catch(function (err) {
        console.error('BROWSE — GET USERS ERRORS:', err);
      });
    };

    getAllUsers();
  }]);
})();
