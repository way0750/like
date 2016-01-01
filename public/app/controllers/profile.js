(function () {
  'use strict';

  angular.module('like.profile', ['like.slideMenu', 'like.stat', 'ngRoute'])
  .controller('profileCtrl', [ 'authService', '$scope', '$http','dataService', '$location', '$mdSidenav', '$routeParams', 'storage', function (authService, $scope, $http, dataService, $location, $mdSidenav, $routeParams, storage) {

    $scope.memory = storage.data;
    $scope.memory.fromProfile = 'fromProfile';
    // console.log(storage.data);

    
    $scope.getUserData = function (userId, quicky) {
      dataService.getUserData(userId, quicky)
      .then(function (res) {
        $scope.firstName = res.data.firstName;
        $scope.lastName = res.data.lastName;
        $scope.gender = res.data.gender === 1 ? 'Male' : 'Female';
        $scope.vote = res.data.vote;
        $scope.allowToVote = res.data.isVoted;
        $scope.alreadyAuthenticated = quicky ? res.data.alreadyAuthenticated : true;
      })
      .catch(function (res) {
        console.log('you already voted for this person!!!');
      });
    };
    
    $scope.switchView = function (location) {
      $location.path(location);
    };
    
    $scope.usingQuickLink = $routeParams.hasOwnProperty('id');
    
    if ($scope.usingQuickLink) {
     sessionStorage.setItem('targetUserId', $routeParams.id); 
    }

    $scope.targetUserId = sessionStorage.getItem('targetUserId');
    $scope.userIsLoggedIn = sessionStorage.getItem('loggedInuser');

    if ($scope.usingQuickLink && !$scope.userIsLoggedIn) {
      $scope.getUserData($routeParams.id, true);
    } else if ($scope.targetUserId !== null) {
      $scope.getUserData(sessionStorage.getItem('targetUserId'));
    }
  }]); //close controller
})();
