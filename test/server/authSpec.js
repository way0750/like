var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var server = require('../../server/server.js');
var request = require('supertest');

describe('Authentication', function() {
  describe('Log In', function () {
    it('should return a 200 on succesful signin', function (done) {
        request(server)
          .post('/api/signin')
          .send({username: 'John', password: 'test'})
          .expect(200, done); //TODO: Add in check of return value
    });

    it('should return a 302 (redirection) on signin failure', function (done) {
        request(server)
          .post('/api/signin')
          .send({username: 'Nottoday', password: 'test'})
          .expect(302, done); //TODO: Add in check of return value
    });

    it('should create new session', function (done) { //TODO: Login and get browse, logout and get browse, unlogged in ever get browse
      request(server)
        .post('/api/signin')
        .send({username: 'John', password: 'test'})
        .end(function(err, res) {
        });
    });
  });

  // describe('Log Out', function () {
  //   it('should destroy existing passport session', function (done) {
  //   });
  //   it('should destroy existing express session', function (done) {
  //   });
  //   it('should redirect to /api/signin', function (done) {
  //   });
  // });
});