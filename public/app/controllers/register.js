(function () {
  'use strict';

  angular.module('like.register', [])
  .controller('registerCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.register = function (useObj) {
      $location.path('/dashboard');
      return $http({
        method: 'post',
        url: '/api/user/create',
        data: useObj
        //useObj: {username: username, password: password}
      }).then(function (data) {
        sessionStorage.setItem('userId', data.data.userId);
        return data.data.userId;
      }).catch(function (err) {
        return err.status;
      });
    }; //close register

    }]); //close controller def
})();
