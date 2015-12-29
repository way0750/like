(function () {
  'use strict';

  angular.module('like.voting', ['like.slideMenu','like.stat', 'ngMaterial'])
  .controller('votingCtrl', ['$scope', 'dataService', 'authService', '$location', function ($scope, dataService, authService, $location) {

    $scope.curQuestion = {};

  }]);
})();
