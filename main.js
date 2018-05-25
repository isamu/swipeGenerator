"use strict";

var Parser = require('./parser.js');

(function () {
  var _G; // Generator 

  const MENU_GENERATOR_SWIPE = 'GENERATOR-SWIPE',
        docInfoFlags = {
    compInfo: true,
    imageInfo: true,
    layerInfo: true,
    expandSmartObjects: true,
    getTextStyles: true,
    getFullTextStyles: true,
    getCompLayerSettings: true,
    selectedLayers: false,
    getDefaultLayerFX: true,
    getPathData: true
  };
  const fs = require("fs");
  const path = require("path");
  const _homeDirectory = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"],
        _desktopDirectory = _homeDirectory && path.resolve(_homeDirectory, "Desktop");

  function stringify(object) {
    try {
      return JSON.stringify(object, null, 1);
    } catch (e) {
      console.error(e);
    }
    return String(object);
  }

  function printDebug(doc) {
    var psd = stringify(doc);

    _G.evaluateJSXFile(__dirname + '/jsx/copy.jsx', { clipboard: psd });
  }
  function error(err) {
    console.log('[svgOMG] Error: ', err);
  }
  function init(generator) {
    _G = generator;
    _G.addMenuItem(MENU_GENERATOR_SWIPE, "Generate swipe", true, false);
    _G.onPhotoshopEvent("generatorMenuChanged", onGeneratorDOMMenuClick);
  }
  function getDirName(doc) {
    const paths = doc.file.split("/");
    return _desktopDirectory + "/" + paths[paths.length - 1].split(".")[0];
  }
  function onGeneratorDOMMenuClick(event) {
    _G.getDocumentInfo(null, docInfoFlags).then(gDoc => {
      const swipePath = getDirName(gDoc);
      if (!fs.existsSync(swipePath)) {
        fs.mkdirSync(swipePath);
      }
      const parse = new Parser(gDoc, _G, swipePath);
      const swipe = parse.getSwipe();

      var filename = "main.swipe";
      // fs.writeFileSync(swipePath + "/" + filename, stringify(swipe));
      fs.writeFileSync(swipePath + "/" + filename, "callback(" + stringify(swipe) + ")");
      copyIndex(swipePath);
      // console.log(stringify(swipe));
    }, error);
  }
  function copyIndex(swipePath) {
    fs.createReadStream(__dirname + "/template/index.html").pipe(fs.createWriteStream(swipePath + "/index.html"));
  }
  module.exports.init = init;
})();