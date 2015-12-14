(function () {
  'use strict';

  angular.module('like.browse', ['ngCookies'])
  .controller('browseCtrl', ['$scope', 'dataService', '$location', '$cookies', function ($scope, dataService, $location, $cookies) {
    $scope.users = {};
    $scope.fakeData = [
      {
        id: 1,
        name: 'God'
      },
      {
        id: 2,
        name: 'Santa'
      },
      {
        id: 3,
        name: 'Yofeng'
      },
      {
        id: 4,
        name: 'God002'
      },
      {
        id: 5,
        name: 'Santa002'
      },
      {
        id: 6,
        name: 'Yofeng002'
      }
    ];
    $scope.getAllUsers = function () {
      dataService.getAllUsers()
      .then(function (users) {
        $scope.users.data = users.data;
      })
      .catch(function (err) {
        console.error('BROWSE — GET USERS ERRORS:', err);
      });
    };

    $scope.switchView = function (str) {
      $location.path(str);
    };

    //once select a user, should redirect to another view and save the selected user's id;
    $scope.selectUser = function (targetUserId) {
      sessionStorage.setItem('targetUserId', targetUserId);
      $location.path('/profile');
    };

    $scope.getAllUsers();
  }]);
})();
