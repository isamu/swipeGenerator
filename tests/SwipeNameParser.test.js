'use strict';

var _chai = require('chai');

var _name_parser = require('../name_parser.js');

var nameParser = _interopRequireWildcard(_name_parser);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('swipe', () => {

  beforeEach(() => {});

  afterEach(() => {});

  describe('Test swipe name parse test', function () {
    it("should be return valid format", function () {
      const name1 = "format:png";
      const ret1 = nameParser.formatParser(name1, "jpg");
      _chai.assert.equal(ret1, "png");

      const name2 = "format:gif";
      const ret2 = nameParser.formatParser(name2, "png");
      _chai.assert.equal(ret2, "gif");
    });

    it("should be return valid default format", function () {
      const name1 = "";
      const ret1 = nameParser.formatParser(name1, "jpg");
      _chai.assert.equal(ret1, "jpg");

      const name2 = "";
      const ret2 = nameParser.formatParser(name2, "png");
      _chai.assert.equal(ret2, "png");
    });

    it("should bot be return invalid format", function () {
      const name1 = "format:doc";
      const ret1 = nameParser.formatParser(name1, "jpg");
      _chai.assert.equal(ret1, "jpg");

      const name2 = "format:pds";
      const ret2 = nameParser.formatParser(name2, "png");
      _chai.assert.equal(ret2, "png");

      const name3 = "format:png1";
      const ret3 = nameParser.formatParser(name3, "png");
      _chai.assert.equal(ret3, "png");

      const name4 = "format:1png";
      const ret4 = nameParser.formatParser(name4, "png");
      _chai.assert.equal(ret4, "png");
    });
  });
});