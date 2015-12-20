(function () {
  angular.module('like.slideMenu', []).directive("slideMenu", function () {
    return {
      restrict: "E",
      templateUrl: "app/templates/slideMenuDirective/slide_menu.html",
      controller: function ($scope, $mdSidenav, authService, $location) {
        $scope.openLeftMenu = function() {
          $mdSidenav('left').toggle();
        };
        $scope.logOut = function () {
          authService.logOut();
          $location.path('/login');
        };

        $scope.switchViewToBrowse = function () {
          $location.path('/browse');
        };
      }
    };
  });  
})();
