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
});