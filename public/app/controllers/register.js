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
          sessionStorage.setItem('userId', data.data.userId);
          return data.data.userId;
        }).catch(function (err) {
          return err.status;
        });
      }
    };
    $scope.goToBrowse = function () {
      $location.path('/browse');
    };
    // }; //close register

    }]); //close controller def
})();
