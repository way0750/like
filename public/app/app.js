var myApp = angular.module('like', ['ngclipboard', 'ngMaterial', 'like.browse', 'like.dashboard', 'like.setting','like.login', 'like.profile', 'like.voting', 'like.storage', 'ngRoute', 'ngAnimate']);
myApp.controller('likeCtrl', function ($scope, $location) {
  $scope.path = {curPath: $location.path()};
});

myApp.config(function ($routeProvider, $mdThemingProvider) {
  $routeProvider
    //for now we will just redirect use to the login page.
    .when('/', {
      templateUrl : './app/templates/login.html',
      controller : 'loginCtrl'
    })
    .when('/login', {
      templateUrl : './app/templates/login.html',
      controller : 'loginCtrl'
    })
    .when('/browse', {
      templateUrl : './app/templates/browse.html',
      controller : 'browseCtrl'
    })
    .when('/dashboard', {
      templateUrl : './app/templates/dashboard.html',
      controller: 'dashboardCtrl'
    })
    .when('/profile', {
      templateUrl : './app/templates/profile.html',
      controller : 'profileCtrl'
    })
    .when('/voting', {
      templateUrl : './app/templates/voting.html',
      controller : 'votingCtrl'
    })
    .when('/setting', {
      templateUrl : './app/templates/setting.html',
      controller : 'settingCtrl'
    })
    .when('/id/:id', {
      templateUrl : './app/templates/profile.html',
      controller : "profileCtrl"
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('orange')
      .accentPalette('grey');
});
