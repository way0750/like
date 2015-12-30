(function () {
  'use strict';

  angular.module('like.dashboard', ['like.stat']).controller('dashboardCtrl', ['$scope', 'authService', 'dataService', '$location', '$mdSidenav', function ($scope, authService, dataService, $location, $mdSidenav) {
 
    $scope.data = 'dashboard';

    $scope.getUserData = function (UserId) {
      UserId = UserId || 'self';
      dataService.getUserData(UserId)
      .then(function (res) {
        $scope.firstName = res.data.firstName;
        $scope.lastName = res.data.lastName;
        $scope.vote = res.data.vote;
        console.log(res);
      })
      .catch(function (err) {
        console.error('DASHBOARD — GET USER DATA ERROR:', err);
      });
    };

    // might need to switch to use the generic getUserData if it is
    //redundent to use two different version.

    $scope.getUserData();

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
