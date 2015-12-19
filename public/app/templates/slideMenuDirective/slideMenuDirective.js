(function () {
  angular.module('like.slideMenu', []).directive("slideMenu", function () {
    return {
      restrict: "E",
      templateUrl: "app/templates/slideMenuDirective/slide_menu.html",
      controller: function ($scope, $mdSidenav) {
        $scope.openLeftMenu = function() {
          $mdSidenav('left').toggle();
        };
      }
    };
  });  
})();
