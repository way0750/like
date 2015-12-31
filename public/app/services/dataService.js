(function () {
  'use strict';

  angular.module('like')
  .factory('dataService', ['$http', function ($http) {
    var getLogedInUserData = function (userId) {
      return $http({
        method: 'GET',
        url: '/api/profile/'
      })
      .then(function (data) {
        return data;
      });
    };

    var getUserData = function (userId, quickie) {
      var baseUrl = quickie ? '/api/quickPreview/' : '/api/profile/';
      var url = baseUrl + userId;
      return $http({
        method: 'GET',
        url: url
      }).then(function (data) {
        return data;
      })
      .catch(function (data) {
        return data;
      });
    };

    var getAllUsers = function (region) {
      return $http({
        method: 'GET',
        url: '/api/browse'
      })
      .then(function (data) {
        return data;
      });
    };

    var sendVotes = function (voteObj) {
      return $http({
        method: 'POST',
        url: '/api/profile/' + voteObj.voteId,
        data: voteObj.traits
      });
    };

    return {
      sendVotes: sendVotes,
      getLogedInUserData: getLogedInUserData,
      getUserData: getUserData,
      getAllUsers: getAllUsers
    };
  }]);
})();
