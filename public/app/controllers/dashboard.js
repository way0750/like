(function () {
  'use strict';

  angular.module('dashboard', []).controller('dashboardCtrl', function ($scope) {
    $scope.logout = function (username, password) {
    };
    $scope.browse = function () {
    };
  });

})();


// TODO : Need to create User Constant to save user data across multiple controllers.
// TODO : Create new service to submit a GET request to populate the browse and dashboard template.
