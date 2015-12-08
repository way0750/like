angular.module('like.service', ['like'])
.factory('authService', function ($http) {
  var login = function (userObj) {
   $http({
    method : 'post',
    url : '/api/login',
    data : userObj
   });
  };
  return {login: login};
})
.factory('dashboardService', function ($http) {
  var getUserData = function () {
    $http({
      method : 'GET',
      url : '/api/dashboard'
    })
  }
})

//////////////////////////////////////////////
// .factory('browseService', function ($http) {
//     var browse = function (region) {
//       $http({
//         method: 'GET',
//         url: '/api/browse/:'+ region
//       });
//     };
//
//     return {browse: browse};
//   });
