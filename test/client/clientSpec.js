'user strict';

describe('Services', function () {
  beforeEach(module('like'));

  describe('AuthService', function () {
    var authService;
    var $http;
    var $httpBackend;
    var authSend;

    beforeEach(inject(function (_authService_, _$httpBackend_) {
      authService = _authService_;
      $httpBackend = _$httpBackend_;
      authSend = sinon.spy(authService, "logIn");
    }));

    it('should send username and password to the server', function () {
      authSend();
      expect(authSend.callCount).to.equal(1);
    });

    it('should receive a 200 status code on success', function () {
      var username = 'John';
      var password = 'this';
      var userObj = {
        username: username,
        password: password
      };
      $httpBackend
        .expectPOST('/api/user/signin', userObj)
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

      $httpBackend.expectPOST('/api/user/signin', userObj)
      .respond(747, {});

      authSend(userObj);
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should receive a 200 status code on when successfully log out', function () {
      logOut = sinon.spy(authService, 'logOut');

      $httpBackend
        .expectPOST('/api/user/signout')
        .respond(200, {});

      logOut();
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('dataService', function () {
    var dataService;
    var $http;
    var $httpBackend;
    var getLogedInUserData;
    var logOut;

    beforeEach(inject(function (_dataService_, _$httpBackend_) {
      dataService = _dataService_;
      $httpBackend = _$httpBackend_;
    }));

    it('should get the user\'s data from the server', function () {
      getLogedInUserData = sinon.spy(dataService, 'getLogedInUserData');
      getLogedInUserData();
      expect(getLogedInUserData.callCount).to.equal(1);
    });

    it('should receive a 200 status code when successfully get user data', function () {
      getLogedInUserData = sinon.spy(dataService, 'getLogedInUserData');
      var userId = 1;
      $httpBackend
        .expectGET('/api/profile/' + userId)
        .respond(200, {});

      getLogedInUserData(userId);
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should receive a 200 status for successfully accessing an existing user\'s data', function () {
      getUserData = sinon.spy(dataService, 'getUserData');
      var userId = 1;
      $httpBackend
        .expectGET('/api/profile/' + userId)
        .respond(200, {});

      getUserData(userId).then(function (data) {
        expect(data.status).to.equal(200);
      });
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should receive a 400 status for successfully accessing a existing user\'s data', function () {
      getUserData = sinon.spy(dataService, 'getUserData');
      var userId = 1;
      $httpBackend
        .expectGET('/api/profile/' + userId)
        .respond(400, {});

      getUserData(userId).then(function (data) {
        expect(data).to.equal(false);
      });
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});

describe('Controllers', function () {
  beforeEach(module('like'));

  describe('Login Controller', function () {
    beforeEach(module('like.login'));

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
    beforeEach(module('like.dashboard'));

    var $controller;
    var $rootScope;
    var scope;
    var $httpBackend;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      $controller('dashboardCtrl', {$scope: scope});
      $httpBackend = _$httpBackend_;
    }));

    it('should have a logout function', function () {
      expect(scope.logout).to.exist;
    });

    it('should have a getLogedInUserData function', function () {
      expect(scope.getLogedInUserData).to.exist;
    });

    it('should call getLogedInUserData once', function () {
      $httpBackend.expectGET('/api/profile/').respond('user no. 0');
      $httpBackend.flush();
      expect(scope.userData).to.eql('user no. 0');
    });
  });

  describe('Browse controller', function () {
    beforeEach(module('like.browse'));

    var $controller;
    var $rootScope;
    var $httpBackend;
    var scope;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
      $controller('browseCtrl', {$scope: scope});
    }));

    it('should have getAllUsers function', function () {
      expect(scope.getAllUsers).to.exist;
    });

    it('should call getAllUsers once', function () {
      // var mockUsers = '[{}, {}, {}]';
      var mockUsers = {
        users: [
        {
          userId: 1234,
          firstName: 'firstName',
          lastName: 'lastName'
        }
        ]
      };
      $httpBackend.expectGET('/api/browse').respond(mockUsers);
      $httpBackend.flush();

      expect(scope.users.data).to.deep.equal(mockUsers);

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('Register Controller', function () {
    beforeEach(module('like.register'));

    var $httpBackend;
    var scope;

    beforeEach(inject(function (_$httpBackend_, _$controller_, _$rootScope_) {
      $httpBackend = _$httpBackend_;
      $controller = _$controller_;
      scope = _$rootScope_.$new();
      _$controller_('registerCtrl', {$scope: scope});
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should a register function', function () {
      expect(scope.register).to.be.a('function');
    });

    it('should create a new user', function () {
      $httpBackend.expectPOST('/api/user/create').respond(200, {
        userId: 1});
      var userObj = {
        username: 'John',
        password: 'password'
      };
      scope.register(userObj).then(function (userId) {
        expect(userId).to.equal(1);
      });
      $httpBackend.flush();
    });

    it('should return an err from server', function () {
      $httpBackend.expectPOST('/api/user/create').respond(400);
      var userObj = {
        username: 'John',
        password: 'password'
      };
      scope.register(userObj).then(function (err) {
        expect(err).to.equal(400);
      });
      $httpBackend.flush();
    });

  });

});
