(function () {
  angular.module('like.login', []).controller('loginCtrl', function ($scope, authService) {
    $scope.username = '';
    $scope.password = '';
    $scope.login = function (username, password) {
      var userObj = {
        username: username,
        password: password
      };
      authService.login(userObj)
      .then(function(data){
        console.log('----------login from server:', data);
        // if successfully logged in 
          sessionStorage.setItem('userId', data.userId || "");
          // redirect 
        // else 
          // tell the user password or username wrong
      })
      .catch(function(err){
        console.log('--------login err: ', err);
      });
    };
  });
})();
