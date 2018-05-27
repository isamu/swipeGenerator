import {assert} from 'chai';
import {Parser} from '../parser.js';
import * as fs from "fs";

describe('swipe', () => {
    
  beforeEach(() => {
  });
  
  afterEach(() => {
  });
  
  function compareJsonResult(path, json) {
    // fs.writeFileSync(__dirname + "/.." + path, JSON.stringify(json, null, 1));
    const res_json = JSON.parse(fs.readFileSync(__dirname + "/.." + path, 'utf8'));
    assert.deepEqual(json, res_json)
  }
  
  describe('Test swipe', function () {
    it("should ok if empty doc", function (){
      const gDoc = {};
      const _G = null;
      const _desktopDirectory = null;

      const parser = new Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();
      assert.typeOf(res.pages, 'array');
      assert.lengthOf(res.pages, 0);
      assert.typeOf(res.templates, 'object');
      assert.isEmpty(res.templates);
    });

    it("should valid swipe page created 1", function (){
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc1.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();

      // console.log(res);
      assert.typeOf(res.pages, 'array');
      assert.lengthOf(res.pages, 2);
      
      assert.typeOf(res.pages[0], 'object');
      assert.typeOf(res.pages[1], 'object');
      
      assert.typeOf(res.templates, 'object');
      assert.isNotEmpty(res.templates);

      compareJsonResult("/testData/res1.json", res);
    });

    
    it("should valid swipe page created 2", function (){
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc1.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getSwipe();

      // console.log(res);
      assert.typeOf(res.pages, 'array');
      assert.lengthOf(res.pages, 2);
      
      assert.typeOf(res.pages[0], 'object');
      assert.typeOf(res.pages[1], 'object');
      
      assert.typeOf(res.templates, 'object');
      assert.isNotEmpty(res.templates);

      // console.log(JSON.stringify(res, null, 1));
      compareJsonResult("/testData/res2.json", res);
    });

    it("should valid swipe page created 3", function (){
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc2.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;

      const parser = new Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();

      // console.log(JSON.stringify(res, null, 1));
      compareJsonResult("/testData/res3.json", res);
    });

    
    it("should get valid swipe element diff", function (){
      const _G = null;
      const _desktopDirectory = null;

      const parser = new Parser({}, _G, _desktopDirectory);

      const diff = parser.diffElement({
        "img": "19.jpg",
        "y": 640,
        "x": 0,
        "h": 384,
        "w": 576
      },
                                      {
                                        "id": "84068205-2521-1e4b-939e-86351085ed9a",
                                        "img": "25.jpg",
                                        "y": 640,
                                        "x": 0,
                                        "h": 384,
                                        "w": 576
                                      });
      assert.deepEqual(diff, { id: '84068205-2521-1e4b-939e-86351085ed9a',
                               opacity: 1,
                               x: 0,
                               y: 640,
                               to: { translate: [ 0, 0 ] } });
      
      const diff2 = parser.diffElement({
        "img": "21.jpg",
        "y": 466,
        "x": 0,
        "h": 432,
        "w": 576
      },
                                        {
                                          "id": "bcb00327-1ca5-5246-acca-3768c2345cca",
                                          "img": "24.jpg",
                                          "y": 0,
                                          "x": 0,
                                          "h": 432,
                                          "w": 576
                                        });
      assert.deepEqual(diff2, { id: 'bcb00327-1ca5-5246-acca-3768c2345cca',
                                opacity: 1,
                                x: 0,
                                y: 466,
                                to: { translate: [ 0, -466 ] } });
      
    });
    // todo check res
    // diffElement
    // parseElement
    // parseLayer 
  
    it("should valid swipe page created with meta", function (){
      const gDoc = JSON.parse(fs.readFileSync(__dirname + "/../testData/gDoc3.json", 'utf8'));
      const _G = null;
      const _desktopDirectory = null;
      
      const parser = new Parser(gDoc, _G, _desktopDirectory);
      const res = parser.getPages();
      compareJsonResult("/testData/res4.json", res);
    });
  });
});
