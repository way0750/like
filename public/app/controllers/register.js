(function () {
  'use strict';

  angular.module('like.register', [])
  .controller('registerCtrl', ['$scope', '$http', '$location', 'authService', function ($scope, $http, $location, authService) {
    $scope.userObj = {};
    $scope.emailCheck = function (str) {
      return /^\s*[\w-_\.\+]+@[\w-]+\.[\w-\.]+$/.test(str);
    };
    $scope.register = function (userObj) {
      if (userObj.password === userObj.confirm) {
        return authService.register(userObj)
        .then(function (data) {
          return data.data.userId;
        })
        .then (function (userId) {
          sessionStorage.setItem('userId', userId);
          $location.path('/dashboard');
        })
        .catch(function (err) {
          return err.status;
        });
      }
    };
    $scope.goToBrowse = function () {
      $location.path('/browse');
    };

    }]); //close controller def
})();
