(function () {
  'use strict';

  angular.module('like.profile', [])
  .controller('profileCtrl', ['$scope', '$http','dashboardService', '$location', function ($scope, $http, dashboardService, $location) {

    $scope.targetUserId = sessionStorage.getItem('targetUserId');

    $scope.getUserData = function (userId) {

      return dashboardService.getUserData(userId)
      .then(function (data) {
        $scope.pubUserData = data;
        return data;
      })
      .catch(function (data) {
        $scope.pubUserData = false;
        return false;
      });
    };

    $scope.toDashboard = function () {
      $location.path('/dashboard');
    };

    $scope.castVote = function (thumb) {
      return $http({
        method: 'POST',
        url: '/api/profile/' + $scope.targetUserId,
        data: {
          id: $scope.targetUserId,
          vote: thumb
        }
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
