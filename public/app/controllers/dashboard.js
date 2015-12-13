(function () {
  'use strict';

  angular.module('like.dashboard', []).controller('dashboardCtrl', ['$scope', 'authService', 'dataService', '$location', function ($scope, authService, dataService, $location) {
    $scope.userData = {};

    $scope.logout = function (username, password) {
      // authService.logout();
      $location.path('/login');
    };

    $scope.getLogedInUserData = function (UserId) {
      dataService.getLogedInUserData(UserId)
      .then(function (user) {
        $scope.userData = user.data;
        setTimeout(function () {
          $scope.getLogedInUserData(sessionStorage.getItem('useId') || '');
          console.log('auto data renewal-------from dashboard!!!!!');
        }, 30000);
      })
      .catch(function (err) {
        console.error('DASHBOARD — GET USER DATA ERROR:', err);
      });
    };

    $scope.redirect = function () {
      $location.path('/browse');
    };
    $scope.getLogedInUserData(sessionStorage.getItem('useId') || '');

    $scope.showDelete = false;
    $scope.showUpdate = false;

  }]);


})();

// TODO : Need to create User Constant to save user data across multiple controllers.
// TODO : Create new service to submit a GET request to populate the browse and dashboard template.
