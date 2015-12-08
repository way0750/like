angular.module('browse', []).controller('browseCtrl', function ($scope, $http) {

  $scope.getAllUser = function(){
    $http({
      method : 'get',
      url : '/api/browse',
    }).then(function succ(res){
      $scope.data = res;
    }, function err(res){
      $scope.data = false;
    });
  };


});
// //////////////////////////////////////////////
// (function() {
//   'use strict';
//
//   angular.module('like.browse', [])
//   .controller('browseCtrl', ['$scope', function ($scope) {
//     $scope.browseRegionalUsers = function (region) {
//       browseService.browse(region);
//     };
//   }]);
// })();
