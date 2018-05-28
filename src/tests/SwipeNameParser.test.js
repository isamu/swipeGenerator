import {assert} from 'chai';
import * as nameParser from '../name_parser.js'
import * as fs from "fs";

describe('swipe', () => {
    
  beforeEach(() => {
  });
  
  afterEach(() => {
  });

  describe('Test swipe name parse test', function () {
    it("should be return valid format", function (){
      const name1 = "format:png";
      const ret1 = nameParser.formatParser(name1, "jpg");
      assert.equal(ret1, "png");

      const name2 = "format:gif";
      const ret2 = nameParser.formatParser(name2, "png");
      assert.equal(ret2, "gif");
      
    });

    it("should be return valid default format", function (){
      const name1 = "";
      const ret1 = nameParser.formatParser(name1, "jpg");
      assert.equal(ret1, "jpg");

      const name2 = "";
      const ret2 = nameParser.formatParser(name2, "png");
      assert.equal(ret2, "png");
      
    });

    it("should bot be return invalid format", function (){
      const name1 = "format:doc";
      const ret1 = nameParser.formatParser(name1, "jpg");
      assert.equal(ret1, "jpg");

      const name2 = "format:pds";
      const ret2 = nameParser.formatParser(name2, "png");
      assert.equal(ret2, "png");

      const name3 = "format:png1";
      const ret3 = nameParser.formatParser(name3, "png");
      assert.equal(ret3, "png");

      const name4 = "format:1png";
      const ret4 = nameParser.formatParser(name4, "png");
      assert.equal(ret4, "png");
      
    });
  });
});
