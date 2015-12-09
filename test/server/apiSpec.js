var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var server = require('../../server/server.js');

describe('API', function() {
  describe('GET api/profile/:id', function () {
    it('should respond with a profile object and a 200 status', function (done) {
      request(server)
        .get('/api/profile/20') //TODO: (1) Add in actual profile number, scaffold profiles
        .expect(200, done); //TODO: Add in check of return value
    });

    it('should respond with no profile and a 404 status', function (done) {
      request(server)
        .get('/api/profile/nothingtofind')
        .expect(404, done);
    });
  });

  describe('GET api/browse/', function () {
    it('should respond with a list of profile IDs/names and a 200 status', function (done) {
      request(server)
        .get('/api/browse')
        .expect(200, done); //TODO: Add in check of return value
    });
  });

  describe('POST api/signin', function () {
    it('should respond with 200 status with correct credentials', function (done) {
      request(server)
        .post('/api/signin') //TODO: Add in data
        .expect(200, done);
    });

    xit('should respond with a 401 status with incorrect credentials', function (done) {
      request(server)
        .post('/api/signin') //TODO: Add in data
        .expect(401, done);
    });
  });
  
  describe('POST api/signout', function () {
    it('should receive and process a POST for signing out', function (done) {
      request(server)
        .post('/api/signout')
        .expect(200, done);
    });
  });

  describe('POST api/user/create', function () {
   it('should receive and process a POST request to create a new user', function (done) {
      request(server)
        .post('/api/user/create')
        .expect(200, done); //TODO: Create additional test to vet the incoming request object
   });
 });

  describe('POST api/vote', function () {
    it('should recieve and process a POST request for voting', function (done) {
      request(server)
        .post('/api/vote/')
        .expect(200, done); //TODO  Create additional test to look within request object
    });
  });
});