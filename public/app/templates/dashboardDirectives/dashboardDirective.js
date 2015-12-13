angular.module('like.dashboard').directive("deleteUser", function () {
  return {
    restrict: "E",
    templateUrl: "app/templates/dashboardDirectives/delete_user.html",
    controller: function ($scope) {
      $scope.delMsg = 'ctrl message: you are in delete user.html';
    }
  };
});

angular.module('like.dashboard').directive("updateUser", function () {
  return {
    restrict: "E",
    templateUrl: "app/templates/dashboardDirectives/update_user.html",
    controller: function ($scope) {
      $scope.editMesg = 'ctrl message: you are in edit user.html';
    }
  };
});
