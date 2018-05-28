'use strict';

var _chai = require('chai');

var _parser = require('../parser.js');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('swipe', () => {

  beforeEach(() => {});

  afterEach(() => {});

  function compareJsonResult(path, json) {
    let write = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (write) {
      fs.writeFileSync(__dirname + "/.." + path, JSON.stringify(json, null, 1));
    }
    const res_json = JSON.parse(fs.readFileSync(__dirname + "/.." + path, 'utf8'));
    _chai.assert.deepEqual(json, res_json);
  }

  describe('Test swipe', function () {
    it("should ok if empty doc", function () {
      const gDoc = {};
      const _G = null;
      const _desktopDirectory = null;

      const parser = new _parser.Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();
      _chai.assert.typeOf(res.pages, 'array');
      _chai.assert.lengthOf(res.pages, 0);
      _chai.assert.typeOf(res.templates, 'object');
      _chai.assert.isEmpty(res.templates);
    });

    it("should valid swipe page created 1", function () {
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc1.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new _parser.Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();

      // console.log(res);
      _chai.assert.typeOf(res.pages, 'array');
      _chai.assert.lengthOf(res.pages, 2);

      _chai.assert.typeOf(res.pages[0], 'object');
      _chai.assert.typeOf(res.pages[1], 'object');

      _chai.assert.typeOf(res.templates, 'object');
      _chai.assert.isNotEmpty(res.templates);

      compareJsonResult("/testData/res1.json", res);
    });

    it("should valid swipe page created 2", function () {
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc1.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new _parser.Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getSwipe();

      // console.log(res);
      _chai.assert.typeOf(res.pages, 'array');
      _chai.assert.lengthOf(res.pages, 2);

      _chai.assert.typeOf(res.pages[0], 'object');
      _chai.assert.typeOf(res.pages[1], 'object');

      _chai.assert.typeOf(res.templates, 'object');
      _chai.assert.isNotEmpty(res.templates);

      // console.log(JSON.stringify(res, null, 1));
      compareJsonResult("/testData/res2.json", res);
    });

    it("should valid swipe page created 3", function () {
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc2.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new _parser.Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();

      // console.log(JSON.stringify(res, null, 1));
      compareJsonResult("/testData/res3.json", res);
    });

    it("should get valid swipe element diff", function () {
      const _G = null;
      const _desktopDirectory = null;

      const parser = new _parser.Parser({}, _G, _desktopDirectory);

      const diff = parser.diffElement({
        "img": "19.jpg",
        "y": 640,
        "x": 0,
        "h": 384,
        "w": 576
      }, {
        "id": "84068205-2521-1e4b-939e-86351085ed9a",
        "img": "25.jpg",
        "y": 640,
        "x": 0,
        "h": 384,
        "w": 576
      });
      _chai.assert.deepEqual(diff, { id: '84068205-2521-1e4b-939e-86351085ed9a',
        opacity: 1,
        x: 0,
        y: 640,
        to: { translate: [0, 0] } });

      const diff2 = parser.diffElement({
        "img": "21.jpg",
        "y": 466,
        "x": 0,
        "h": 432,
        "w": 576
      }, {
        "id": "bcb00327-1ca5-5246-acca-3768c2345cca",
        "img": "24.jpg",
        "y": 0,
        "x": 0,
        "h": 432,
        "w": 576
      });
      _chai.assert.deepEqual(diff2, { id: 'bcb00327-1ca5-5246-acca-3768c2345cca',
        opacity: 1,
        x: 0,
        y: 466,
        to: { translate: [0, -466] } });
    });
    // todo check res
    // diffElement
    // parseElement
    // parseLayer 

    it("should valid swipe page created with meta", function () {
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc3.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new _parser.Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();
      compareJsonResult("/testData/res4.json", res);
    });

    it("should valid swipe page created 4", function () {
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc4.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new _parser.Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();
      compareJsonResult("/testData/res5.json", res);
    });

    it("should valid swipe page created 5", function () {
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc5.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new _parser.Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();
      console.log(res);
      compareJsonResult("/testData/res6.json", res);
    });

    it("should valid swipe page created 5", function () {
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/textLayer.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new _parser.Parser({}, _G, _desktopDirectory);
      const res = parser.parseElement(gDoc);
      compareJsonResult("/testData/res7.json", res);
    });
  });
});