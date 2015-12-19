(function () {
  'use strict';

  angular.module('like.browse', ['like.slideMenu'])
  .controller('browseCtrl', ['$scope', 'dataService', 'authService', '$location', function ($scope, dataService, authService, $location) {
    $scope.users = {};

    $scope.logOut = function () {
      authService.logOut();
      $location.path('/login');
    };

    $scope.getAllUsers = function () {
      dataService.getAllUsers()
      .then(function (users) {
        $scope.users.data = users.data;
        console.log('got data ro what?', $scope.users);
      })
      .catch(function (err) {
        console.error('BROWSE — GET USERS ERRORS:', err);
      });
    };

    $scope.switchView = function () {
      $location.path('/browse');
    };

    //once select a user, should redirect to another view and save the selected user's id;
    $scope.selectUser = function (targetUserId) {
      sessionStorage.setItem('targetUserId', targetUserId);
      $location.path('/profile');
    };

    $scope.getAllUsers();
  }]);
})();
