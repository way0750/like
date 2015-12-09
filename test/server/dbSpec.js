/*jshint expr: true*/
var db = require('../../DB/db.js');

var expect = require('chai').expect;
var Profile = require('../../server/models/profileModel');
var Trait = require('../../server/models/traitModel');
var Loc = require('../../server/models/locationModel');
var Vote = require('../../server/models/voteModel');

describe('DB Models', function () {

  describe('Profile Model', function () {

    it('should exist', function () {
      expect(Profile).to.exist;
    });

  });

  describe('Trait Model', function () {

    it('should exist', function () {
      expect(Trait).to.exist;
    });

  });

  describe('Location Model', function () {

    it('should exist', function () {
      expect(Loc).to.exist;
    });
  });

  describe('Vote Model', function () {

    it('should exist', function () {
      expect(Vote).to.exist;
    });

  });

});