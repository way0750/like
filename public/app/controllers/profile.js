(function () {
  'use strict';

  angular.module('like.profile', [])
  .controller('profileCtrl', ['$scope', '$http','dashboardService', '$location', function ($scope, $http, dashboardService, $location) {

    $scope.targetUserId = sessionStorage.getItem('targetUserId');
    $scope.pubUserData = {
      awesomeness: 1000,
      handsomeness: 2000,
      iq: 3000
    };
    $scope.getUserData = function (userId) {

      return dashboardService.getUserData(userId)
      .then(function (data) {
        // $scope.pubUserData = data;
        return data;
      })
      .catch(function (data) {
        // $scope.pubUserData = false;
        return false;
      });
    };

    $scope.toDashboard = function () {
      $location.path('/dashboard');
    };

    $scope.sendVote = function (thumb) {
      return $http({
        method: 'POST',
        url: '/api/vote/' + $scope.targetUserId,
        data: {
          id: $scope.targetUserId,
          vote: thumb,
          trait: 'nothing yet!'
        }
        // data: {id: number, vote: string, trait: string}
      }).then(function (data) {
        $scope.data = data.data;
        return data.data;
      }).catch(function (data) {
        $scope.data = false;
        return false;
      });
    };
    if ($scope.targetUserId !== null) {
      $scope.getUserData(sessionStorage.getItem('targetUserId'));
    }
  }]); //close controller
})();
