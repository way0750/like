(function() {
  'use strict';

  angular.module('like.browse', [])
  .controller('browseCtrl', ['$scope', 'browseService', function ($scope, browseService) {
    $scope.users = {};

    $scope.getUsers = function () {
      $scope.users = browseService.getUsers();
    };
  }]);
})();
