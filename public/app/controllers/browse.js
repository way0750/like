(function () {
  'use strict';

  angular.module('like.browse', ['ngCookies'])
  .controller('browseCtrl', ['$scope', 'browseService', '$location', '$cookies', function ($scope, browseService, $location, $cookies) {
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
      }
    ];
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


    //once select a user, should redirect to another view and save the selected user's id;
    $scope.selectUser = function (targetUserId) {
      sessionStorage.setItem('targetUserId', targetUserId);
      console.log(sessionStorage.getItem('targetUserId'));
      $location.path('/profile');
    };

    $scope.getAllUsers();
  }]);
})();
