(function () {
  'use strict';

  angular.module('like.dashboard', []).controller('dashboardCtrl', ['$scope', 'dashboardService', '$location', function ($scope, dashboardService, $location) {
    $scope.userData = {};

    $scope.logout = function (username, password) {
      // dashboardService.logout();
      $location.path('/login');
    };

    $scope.getUserData = function (UserId) {
      dashboardService.getUserData(UserId)
      .then(function (user) {
        $scope.userData = user.data;
        setTimeout(function () {
          $scope.getUserData(sessionStorage.getItem('useId') || '');
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
    $scope.getUserData(sessionStorage.getItem('useId') || '');
  }]);
})();


// TODO : Need to create User Constant to save user data across multiple controllers.
// TODO : Create new service to submit a GET request to populate the browse and dashboard template.
