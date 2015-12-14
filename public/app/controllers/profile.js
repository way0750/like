(function () {
  'use strict';

  angular.module('like.profile', [])
  .controller('profileCtrl', ['$scope', '$http','dataService', '$location', function ($scope, $http, dataService, $location) {

    $scope.targetUserId = sessionStorage.getItem('targetUserId');
    $scope.pubUserData = {
        userId: 1,
        firstName: "Kyle",
        lastName: "Cho",
        traits: [
          {
            trait: "extraversion",
            netVote: 10,
            votingRecord: 'up'
          },
          {
            trait: "introversion",
            netVote: 736,
            votingRecord: 'up'
          },
          {
            trait: "sensing",
            netVote: 324,
            votingRecord: 'down'
          },
          {
            trait: "intuition",
            netVote: 34,
            votingRecord: 'down'
          },
          {
            trait: "thinking",
            netVote: 234,
            votingRecord: 'up'
          },
          {
            trait: "feeling",
            netVote: 676,
            votingRecord: 'up'
          },
          {
            trait: "judging",
            netVote: -235,
            votingRecord: 'up'
          },
          {
            trait: "perceiving",
            netVote: -987,
            votingRecord: 'down'
          }
        ]
    };

    $scope.getUserData = function (userId) {

      return dataService.getUserData(userId)
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

    $scope.sendVote = function (voteArr) {
      var data = {
        userId: voteArr[0],
        trait: voteArr[1],
        vote: voteArr[2]
      };
      return $http({
        method: 'POST',
        url: '/api/vote/' + data.userId,
        data: data
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
