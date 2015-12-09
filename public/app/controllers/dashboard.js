(function () {
  'use strict';

  angular.module('like.dashboard', []).controller('dashboardCtrl', ['$scope', 'dashboardService', function ($scope, dashboardService) {
    $scope.userId = '';
    $scope.userData = {};

    $scope.logout = function (username, password) {
      dashboardService.logout();
    };

    $scope.getUserData = function (UserId) {
      dashboardService.getUserData(UserId)
      .then(function (user) {
        $scope.userData = data;
      })
      .catch(function (err) {
        console.error('DASHBOARD — GET USER DATA ERROR:', err);
      });
    };

    $scope.getUserData($scope.userId);
  }]);
})();


// TODO : Need to create User Constant to save user data across multiple controllers.
// TODO : Create new service to submit a GET request to populate the browse and dashboard template.
