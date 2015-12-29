(function () {
  'use strict';

  angular.module('like.dashboard', ['like.stat']).controller('dashboardCtrl', ['$scope', 'authService', 'dataService', '$location', '$mdSidenav', function ($scope, authService, dataService, $location, $mdSidenav) {
 
    $scope.data = 'dashboard';

    $scope.getLogedInUserData = function (UserId) {
      dataService.getLogedInUserData(UserId)
      .then(function (res) {
        $scope.userData = res.data;
      })
      .catch(function (err) {
        console.error('DASHBOARD — GET USER DATA ERROR:', err);
      });
    };

    // might need to switch to use the generic getUserData if it is
    //redundent to use two different version.
    $scope.getLogedInUserData(sessionStorage.getItem('useId') || '');

    $scope.showDelete = false;
    $scope.showUpdate = false;

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

  }]).controller('MyController', function($scope, $mdSidenav) {
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  });
})();
