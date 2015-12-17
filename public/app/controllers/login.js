(function () {
  'use strict';

  angular.module('like.login', ['like.slideMenu']).controller('loginCtrl', ['$scope', 'authService', '$location', function ($scope, authService, $location) {

    console.log($scope.userState);
    $scope.login = function (username, password) {
      var userObj = {
        username: username,
        password: password
      };
      authService.logIn(userObj)
      .then(function (data) {
        sessionStorage.setItem('userId', data.userId || "");
        $location.path('/dashboard');
      })
      .catch(function (err) {
        console.log('--------login err: ', err);
      });
    };

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

  }]);//close controller def
})();
