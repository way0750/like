(function () {
  'use strict';

  angular.module('like.setting', ['like.slideMenu'])
  .controller('settingCtrl', ['$scope', 'dataService', 'authService', '$location', function ($scope, dataService, authService, $location) {


    // data formate:
    // var userObj = {
    //   username  : username,
    //   password  : password,
    //   firstName : req.body.firstName,
    //   lastName  : req.body.lastName,
    //   email     : req.body.email
    // };

    // body.username

    $scope.sendUpdate = function (newInfo) {
      for (var prop in newInfo) {
        if (newInfo[prop] === undefined) {
          delete newInfo[prop];
        }
      }
      var validEmail = $scope.emailCheck(newInfo.email);
      if (validEmail) {
        //call function here!
      } else {
        console.log('check your email');
      }
      console.log(newInfo);
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
        });
      } else {
        console.log('where did you learn math?', $scope.num1 + $scope.num2 ,$scope.lastWord);
      }
    };

  }]);
})();
