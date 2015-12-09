(function () {
  'use strict';
  angular.module('like.register', [])
  .controller('registerCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.register = function (useObj) {
      $location.path('/dashboard');
      return $http({
        method: 'post',
        url: '/api/register',
        data: useObj
      }).then(function (data) {
        sessionStorage.setItem('userId', data.userId);
      }).catch(function (err) {
        console.log('in register---------got this for making $http call:', err);
        return err;
      });
    }; //close register

    }]); //close controller def
})();
