(function () {
  'use strict';

  angular.module('like.dashboard', []).controller('dashboardCtrl', ['$scope', 'authService', 'dataService', '$location', function ($scope, authService, dataService, $location) {
    $scope.userData = {};

    $scope.logOut = function (username, password) {
      authService.logOut();
      $location.path('/login');
    };

    $scope.getLogedInUserData = function (UserId) {
      dataService.getLogedInUserData(UserId)
      .then(function (res) {
        $scope.userData = res.data;
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
