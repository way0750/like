(function () {
  'use strict';

  angular.module('like.login', []).controller('loginCtrl', ['$scope', 'authService', '$location', function ($scope, authService, $location) {
    $scope.username = '';
    $scope.password = '';
    $scope.login = function (username, password) {
      var userObj = {
        username: username,
        password: password
      };
      //server not ready so commended out these lines:
      authService.logIn(userObj)
      .then(function (data) {
        sessionStorage.setItem('userId', data.userId || "");
        $location.path('/dashboard');
      })
      .catch(function (err) {
        console.log('--------login err: ', err);
      });
    };

    $scope.goToRegister = function () {
      $location.path('/register');
    };
  }]);//close controller def
})();
