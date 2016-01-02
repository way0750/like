var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var server = require('../../server/server.js');
var Profile = require('../../server/models/profileModel');

var superagent = require('superagent');
var agent = superagent.agent();
var theAccount = {
  "username": "John",
  "password": "test"
};

//TODO pending tests for logged users for browse and vote


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
          // console.log('RESPONSE IS: ', res.headers);
          expect(res.headers['set-cookie']).to.exist;
          done();
        });
    });
  });


  describe('Log Out', function () {
    it('should not allow access to /api/users if not logged in', function (done) {
      request(server)
        .get('/api/users')
        .expect(401, done);
    });

   it('should allow access to /api/users if logged in', function (done) {
      var agent = request.agent(server);
      agent
        .post('/api/signin')
        .send({username: 'John', password: 'test'})
        .end(function(err, res) {
          console.log('signed in');
          agent
            .get('/api/users')
            .expect(200, done);
        });
    });

     it('should not allow access to /api/vote if not logged in', function (done) {
      request(server)
        .post('/api/vote')
        .expect(401, done);
    });

    it('should allow access to /api/vote if logged in', function (done) {
      var agent = request.agent(server);
      agent
      .post('/api/signin')
      .send({username: 'John', password: 'test'})
      .end(function(err, res) {
        console.log('signed in');
        agent
          .post('/api/vote')
          .expect(200, done);
      });
    });
  });

  describe('Create User', function() {
    this.timeout(5000);
    afterEach(function (done) {
      Profile.destroy({where: {username: 'Bob12'}})
             .catch(function(err) {
              console.log('Create Spec error: ', err);
             });
     Profile.destroy({where: {username: 'Frank12'}})
            .then(function() {
              done();
            })
            .catch(function(err) {
             console.log('Create Spec error: ', err);
            });

    });

    it('should add a user to the database', function (done) {
      var userA = {
        username: 'Bob12',
        password: 'test',
        firstName: 'Bobbsky',
        lastName: 'Fremont',
        email: 'bfremont@usa.gov'
      };

      request(server)
        .post('/api/profile/create')
        .send(userA)
        .end(function(err, res) {
          console.log('Error in adding user to db: ', err);
        return Profile.find({where : {username: 'Bob12'}})
               .then(function(user) {
                console.log('user found');
                 expect(user.dataValues.username).to.equal('Bob12');
                 expect(user.dataValues.firstName).to.equal('Bobbsky');
                 expect(user.dataValues.lastName).to.equal('Fremont');
                 done();
               })
               .catch(function(err) {
                console.log('Error is here:      ', err);
               });
        });
        // done();
    });

    it('should not allow for non-unique username', function(done) {
      var userB = {
        username: 'Frank12',
        password: 'test2',
        firstName: 'Frank',
        lastName: 'Willy',
        email: 'fwilly@france.gov'
      };

      Profile.create(userB)
        .then(function() {
          request(server)
                .post('/api/profile/create')
                .send(userB)
                .expect(451, done);
        })
        .catch(done);
      // done();
    });
  });
});
