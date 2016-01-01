(function () {
  'use strict';

  angular.module('like.dashboard', ['like.stat']).controller('dashboardCtrl', ['$scope', 'authService', 'dataService', '$location', '$mdSidenav', 'storage', function ($scope, authService, dataService, $location, $mdSidenav, storage) {
    
    $scope.memory = storage.data;
    $scope.memory.fromDashboard = 'fromDashboard';
    //console.log(storage.data);

    $scope.getUserData = function () {
      dataService.getUserData('self')
      .then(function (res) {
        $scope.firstName = res.data.firstName;
        $scope.lastName = res.data.lastName;
        $scope.vote = res.data.vote;
      });
    };

    $scope.getUserData();

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

  }]).controller('MyController', function($scope, $mdSidenav) {
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  });
})();
