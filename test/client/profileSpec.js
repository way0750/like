// when user cast a vote, up or down, it should
// 1: send the vote to server
// 2: update the view

describe('casting vote', function () {
  beforeEach(module('like'));
  beforeEach(module('like.profile'));

  var $httpBackend;
  var scope;
  beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
    scope = _$rootScope_.$new();
    _$controller_('profileCtrl', {$scope: scope});

    //the following two lines just to handel the default scope.getUserData call at the scope initialization
    // $httpBackend.expectGET('/api/profile/1100').respond('user no. 0');
    // $httpBackend.flush();
  }));

  it('should have all of these functions', function () {
    expect(scope).to.have.property('getUserData');
    expect(scope).to.have.property('toDashboard');
    expect(scope).to.have.property('sendVote');
  });

  it('should send a vote to the server', function () {
    scope.targetUserId = '1234';
    var vote = {
      "id": "1234",
      "vote": "159",
      "trait": "nothing yet!"
    };
    $httpBackend.expectPOST('/api/vote/' + scope.targetUserId, vote).respond({data : {}});

    scope.sendVote('159').then(function (res) {
      expect(res.data).to.eql({});
    });

    $httpBackend.flush();
  });

  it('should have data from server if call is successful', function () {
    var fakeUser = 11;
    var fakeData = {arr: [{}, {}]};
    $httpBackend.when('GET', '/api/profile/' + fakeUser).respond(fakeData);

    scope.getUserData(fakeUser).then(function (res) {
      expect(res.data).to.eql(fakeData);
    });
    $httpBackend.flush();
  });

});

