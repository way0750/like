(function () {
  angular.module('like.slideMenu', []).directive("slideMenu", function () {
    return {
      restrict: "E",
      templateUrl: "app/templates/slideMenuDirective/slide_menu.html",
      controller: function ($scope, $mdSidenav, authService, $location) {
        $scope.openLeftMenu = function() {
          $mdSidenav('left').toggle();
        };

        $scope.switchViewTo = function (route) {
          if (route === '/login' ){
            authService.logOut();
          }
          $location.path(route);
        };
        
      }
    };
  });  
})();
