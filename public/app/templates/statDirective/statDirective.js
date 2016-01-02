(function () {
  angular.module('like.stat', []).directive("statDisplay", function () {
    return {
      restrict: "E",
      templateUrl: "app/templates/statDirective/statDirective.html",
      controller: function ($scope, $mdSidenav, authService, $location) {
        
      }
    };
  });  
})();
