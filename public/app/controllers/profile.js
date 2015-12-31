(function () {
  'use strict';

  angular.module('like.profile', ['like.slideMenu', 'like.stat', 'ngRoute'])
  .controller('profileCtrl', ['$scope', '$http','dataService', '$location', '$mdSidenav', '$routeParams', function ($scope, $http, dataService, $location, $mdSidenav, $routeParams) {

    $scope.targetUserId = sessionStorage.getItem('targetUserId');

    $scope.getUserData = function (userId, quicky) {
      dataService.getUserData(userId, quicky)
      .then(function (res) {
        $scope.firstName = res.data.firstName;
        $scope.lastName = res.data.lastName;
        $scope.vote = res.data.vote;
        $scope.allowToVote = res.data.isVoted;
        console.log('isVoted:', res.data.isVoted, 'got this as vote data', $scope.vote);
      })
      .catch(function (res) {
        console.log('you already voted for this person!!!');
      });
    };

    $scope.switchView = function (location) {
      $location.path(location);
    };

    $scope.prospectUser = $routeParams.hasOwnProperty('id');

    if ($scope.prospectUser) {
      $scope.getUserData($routeParams.id, true);
    } else if ($scope.targetUserId !== null) {
      $scope.getUserData(sessionStorage.getItem('targetUserId'));
    }
  }]); //close controller
})();
