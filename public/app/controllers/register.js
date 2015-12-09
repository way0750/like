(function () {
  'use strict';
  angular.module('like.register', []).controller('registerCtrl', ['$scope', '$http', '$location', function ($scope, $http) {
    $scope.register = function (useObj) {
      return $http({
        method: 'post',
        url: '/api/register',
        data: useObj
      }).then(function (data) {
        sessionStorage.setItem('userId', data.userId);
        $location.path('/dashboard');
      }).catch(function (err) {
        console.log('in register---------got this for making $http call:', err);
        return err;
      });
    }; //close register

    }]); //close controller def
})();
