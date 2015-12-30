(function () {
  'use strict';

  angular.module('like.setting', ['like.slideMenu'])
  .controller('settingCtrl', ['$scope', 'dataService', 'authService', '$location', function ($scope, dataService, authService, $location) {

    $scope.sendUpdate = function (newInfo) {
      for (var prop in newInfo) {
        if (newInfo[prop] === undefined) {
          delete newInfo[prop];
        }
      }
      if (newInfo.hasOwnProperty('email') && !$scope.emailCheck(newInfo.email)) {
        console.log('email no good:', newInfo);
        delete newInfo.email;
      } else {
        console.log('tyring to update with these:', newInfo);
        authService.update(newInfo)
        .then( function (data) {
          console.log('got this back for updating:', data);
          $location.path('/dashboard');
        });
      }
    };

    $scope.emailCheck = function (str) {
      return /^\s*[\w-_\.\+]+@[\w-]+\.[\w-\.]+$/.test(str);
    };

    $scope.tryToDelete = function () {
      $scope.showDanger = true;
      $scope.num1 = Math.floor(Math.random() * 100);
      $scope.num2 = Math.floor(Math.random() * 100);
    };
    $scope.deleteAccount = function () {
      if ($scope.num1 + $scope.num2 === +$scope.lastWord){
        console.log('alright you have just deleted your account');
        authService.deleteAccount()
        .then(function (data) {
          console.log('break up message:--', data);
        })
        .catch(function (data) {
          console.log('break up message:--', data);
          $location.path('/login');
        });
      } else {
        console.log('where did you learn math?', $scope.num1 + $scope.num2 ,$scope.lastWord);
      }
    };

  }]);
})();
