/* jshint expr:true */
//Controllers
describe('Services', function () {

  describe('Authentication', function () {
    beforeEach(module('like'));
    beforeEach(module('like.service'));

    var authService;
    var $http;
    var $httpBackend;
    var authSend;

    beforeEach(inject(function (_authService_, _$http_, _$httpBackend_) {
      authService = _authService_;
      $http = _$http_;
      $httpBackend = _$httpBackend_;
      authSend = sinon.spy(authService, "login");
    }));

    it('should send', function () {
      authSend();
      expect(authSend.callCount).to.equal(1);
    });

    it('should load angular', function () {
      expect(angular).to.exist;
    });

    it('should receive a 200 status code on success', function () {
      var username = 'John';
      var password = 'this';
      var userObj = {
        username: username,
        password: password
      };
      $httpBackend
        .expectPOST('/api/login', userObj)
        .respond(200, {});

      authSend(userObj);
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

    });
    it('should receive a 747 status code on failure', function () {
      var userObj = {
        username: 'John',
        password: 'wrong'
      };

      $httpBackend.expectPOST('/api/login', userObj)
      .respond(747, {});

      authSend(userObj);
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

    });
  });
});

describe('Controllers', function () {

  describe('Login Controller', function () {
    beforeEach(module('like'));
    beforeEach(module('login'));

    var controller;
    var $rootScope;
    var scope;

    beforeEach(inject(function (_$controller_, _$rootScope_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      controller = $controller('loginCtrl', {$scope: scope});
    }));

    it('should have a login function', function () {
      expect(scope.login).to.exist;
    });

    it('should load angular', function () {
      expect(angular).to.exist;
    });
  });

  describe('Dashboard Controller', function () {
    beforeEach(module('like'));
    beforeEach(module('dashboard'));

    var controller;
    var $rootScope;
    var scope;

    beforeEach(inject(function (_$controller_, _$rootScope_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      controller = $controller('dashboardCtrl', {$scope: scope});
    }));

    it('should have a logout function', function () {
      expect(scope.logout).to.exist;
    });

    it('should have a browse function', function () {
      expect(scope.browse).to.exist;
    });
  });

  describe('browser controller test spec', function () {

  beforeEach(module('browse'));

  var controller, $httpBackend, $scope;

  beforeEach(inject(function(_$controller_, $injector){
    controller = _$controller_;
    $httpBackend = $injector.get('$httpBackend');
    $scope = {};
    controller('browseCtrl', { $scope: $scope });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a getAllUser function(this is only for mvp!!!!)', function(){
    expect($scope.getAllUser).to.be.an('function');
  });

  it('should make http request to /api/browse', function(){
    //invoke the function then check and see if it make a get request to /api/browse/
    $httpBackend.expect('GET', '/api/browse').respond(200);
    $scope.getAllUser();
    $httpBackend.flush();
  });

  it('should set $scope to false if server respond with 400', function(){
    $httpBackend.expect('GET', '/api/browse').respond(400);
    $scope.getAllUser();
    $httpBackend.flush();
    expect($scope.data).to.equal(false);
  });

  it('should set $scope to an object if server respond with 200', function(){
    $httpBackend.expect('GET', '/api/browse').respond(200, {});
    $scope.getAllUser();
    $httpBackend.flush();
    expect($scope.data).to.be.an('object');
  });

});
  // describe('Browse Controller', function () {
  //   beforeEach(module('like.browse'));
  //
  //   var controller;
  //   var $rootScope;
  //   var scope;
  //
  //   beforeEach(inject(function (_$controller_, _$rootScope_) {
  //     $controller = _$controller_;
  //     $rootScope = _$rootScope_;
  //     scope = $rootScope.$new();
  //     controller = $controller('browseCtrl', {$scope: scope});
  //   }));
  //
  //   it('should have a browseRegionalUsers function', function () {
  //     expect(scope.browseRegionalUsers).to.exist;
  //   });
  // });

});
