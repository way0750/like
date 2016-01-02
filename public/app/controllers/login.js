(function () {
  'use strict';

  angular.module('like.login', ['like.slideMenu']).controller('loginCtrl', ['$scope', 'authService', '$location', 'storage', function ($scope, authService, $location, storage) {

    $scope.errMsg = "found error!";

    $scope.login = function (username, password) {
      var userObj = {
        username: username,
        password: password
      };
      authService.logIn(userObj)
      .then(function (data) {
        var reservedAction = sessionStorage.getItem('targetUserId');
        if (reservedAction) {
          $location.path('/profile');
        } else {
          $location.path('/dashboard');
        }
      })
      .catch(function (err) {
        console.log('--------login err: ', err);
        $scope.errorfound = true;
        $scope.errMsg = 'Wrong User Name Or Password';
      });
    };

    $scope.emailCheck = function (str) {
      return /^\s*[\w-_\.\+]+@[\w-]+\.[\w-\.]+$/.test(str);
    };

    var checkRequiredValues = function (userObj) {
      var requiredInputs = ['username', 'password', 'passwordConfirmation', 'firstName', 'lastName', 'gender'];
      var stillNeed = requiredInputs.filter(function (prop){
        return userObj[prop] === undefined;
      });
      return stillNeed;
    };

    $scope.register = function (userObj) {
      var stillNeedRequirements = checkRequiredValues(userObj);
      console.log('trying to register wiht this:',userObj, 'still need these:', stillNeedRequirements);
      if (userObj.password === userObj.passwordConfirmation, !stillNeedRequirements.length) {
        return authService.register(userObj)
        .then(function (data) {
          return data.data.userId;
        })
        .then (function (userId) {
        var reservedAction = sessionStorage.getItem('targetUserId');
        if (reservedAction) {
          $location.path('/profile');
        } else {
          $location.path('/dashboard');
        }
        })
        .catch(function (err) {
          if (err.data === '451'){
            $scope.errorfound = true;
            $scope.errMsg = 'Account Already Exist';
          }
        });
      } else {
        $scope.errorfound = true;
        $scope.errMsg = 'Still Need These To Register: ' + stillNeedRequirements.join(', '); 
      }
    };

  }]);//close controller def
})();
