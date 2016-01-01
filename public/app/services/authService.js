(function () {
  'use strict';

  angular.module('like.login')
  .factory('authService', ['$http', function ($http) {
    // var setLoginStatus = function () {
    //   // '/api/loginStatus'
    //   return $http({
    //     method: 'GET',
    //     url: '/api/loginStatus',
    //   }).then( function (data) {
    //     console.log('got this for checking:', data);
    //     sessionStorage.setItem('loggedInuser', data);
    //   }).catch( function (data) {
    //     console.log('got this for checking:', data);
    //     sessionStorage.setItem('loggedInuser', null);
    //   });
    // };

    var logIn = function (userObj) {
     return $http({
      method: 'POST',
      url: '/api/signin',
      data: userObj
     }).then (function (data) {
      sessionStorage.setItem('loggedInuser', data.data.id);
      return data;
     });
    };

    var logOut = function () {
      console.log('trying to get out?');
      sessionStorage.setItem('loggedInuser', '');
      sessionStorage.setItem('targetUserId', '');
      // console.log('so every thing should null:', typeof sessionStorage.getItem('loggedInuser'));
      return $http({
        method: 'POST',
        url: '/api/signout'
      });
    };

    var register = function (useObj) {
      return $http({
        method: 'POST',
        url: '/api/profile/',
        data: useObj
      });
    };
////need to test this with server
    var update = function (userDataObj) {
      return $http({
        method: 'PUT',
        url: 'api/profile/',
        data: userDataObj
      }).then(function (data) {
        return data;
      }).catch(function (data) {
        return data;
      });
    };

////need to test this with server
    var deleteUser = function (userId) {
      return $http({
        method: 'DELETE',
        url: 'api/profile/'
      }).then(function (data) {
        return data;
      }).catch(function (data) {
        return data;
      });
    };

    var deleteAccount = function () {
      return $http({
        method: 'DELETE',
        url: '/api/profile/'
      });
    };


    return {
      deleteAccount: deleteAccount,
      logIn: logIn,
      logOut: logOut,
      register: register,
      update: update,
      deleteUser: deleteUser
      // setLoginStatus: setLoginStatus
    };
  }]);
})();
