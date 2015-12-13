(function () {
  'use strict';

  angular.module('like.login')
  .factory('authService', ['$http', function ($http) {
    var logIn = function (userObj) {
     return $http({
      method: 'POST',
      url: '/api/user/signin',
      data: userObj
      //useObj: {username: username, password: password}
     });
    };

    var logOut = function () {
      return $http({
        method: 'POST',
        url: '/api/user/signout'
        //{}
      });
    };

    var register = function (useObj) {
      return $http({
        method: 'POST',
        url: '/api/user/create',
        data: useObj
      });
    };

    var update = function (userDataObj) {
      return $http({
        method: 'PUT',
        url: 'api/user/update/' + userDataObj.userId,
        data: userDataObj
      }).then(function (data) {
        return data;
      }).catch(function (data) {
        return data;
      });
    };

    var deleteUser = function (userId) {
      return $http({
        method: 'DELETE',
        url: 'api/delete/' + userId
      }).then(function (data) {
        return data;
      }).catch(function (data) {
        return data;
      });
    };

    return {
      logIn: logIn,
      logOut: logOut,
      register: register,
      update: update,
      deleteUser: deleteUser
    };
  }]);
})();
