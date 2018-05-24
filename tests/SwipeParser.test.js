var assert = require('chai').assert;
var Parser = require('../parser.js');
var fs = require("fs");
describe('swipe', () => {
    
  beforeEach(() => {
  });
  
  afterEach(() => {
  });
  
  describe('Test swipe', function () {
    it("should ok if empty doc", function (){
      const gDoc = {};
      const _G = null;
      const _desktopDirectory = null;

      const parse = new Parser(gDoc, _G, _desktopDirectory);
      const res = parse.getPages();
      assert.typeOf(res.pages, 'array');
      assert.lengthOf(res.pages, 0);
      assert.typeOf(res.templates, 'object');
      assert.isEmpty(res.templates);
    });

    it("should ok", function (){
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/testData/gDoc1.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parse = new Parser(gDoc, _G, _desktopDirectory);
      const res = parse.getPages();

      console.log(res);
      assert.typeOf(res.pages, 'array');
      assert.lengthOf(res.pages, 2);
      
      assert.typeOf(res.pages[0], 'object');
      assert.typeOf(res.pages[1], 'object');
      
      assert.typeOf(res.templates, 'object');
      assert.isNotEmpty(res.templates);

      const res_json = JSON.parse(fs.readFileSync(__dirname + "/testData/res1.json", 'utf8'));
      assert.deepEqual(res, res_json)
    });

    // todo check res
    // diffElement
    // parseElement
    // parseLayer 
  });
});
