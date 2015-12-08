(function () {
  angular.module('login', []).controller('loginCtrl', function ($scope, authService) {
    $scope.username = '';
    $scope.password = '';
    $scope.login = function (username, password) {
      var userObj = {
        username: username,
        password: password
      };
      authService.login(userObj);
    };
  });
})();
