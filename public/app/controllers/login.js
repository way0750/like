(function () {
  'use strict';

  angular.module('like.login', ['like.slideMenu']).controller('loginCtrl', ['$scope', 'authService', '$location', 'storage', function ($scope, authService, $location, storage) {

    $scope.memory = storage.data;
    $scope.memory.hasLoggedIn = 'fromLogin';
    // console.log(storage.data);
    $scope.login = function (username, password) {
      var userObj = {
        username: username,
        password: password
      };
      authService.logIn(userObj)
      .then(function (data) {
        console.log('so why going to profile???', sessionStorage.getItem('targetUserId'));
        var reservedAction = sessionStorage.getItem('targetUserId');

        if (reservedAction) {
          $location.path('/profile');
        } else {
          $location.path('/dashboard');
        }
      })
      .catch(function (err) {
        console.log('--------login err: ', err);
        $scope.wrongCred = true;
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
          $location.path('/dashboard');
        })
        .catch(function (err) {
          return err.status;
        });
      }
    };

  }]);//close controller def
})();
