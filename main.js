"use strict";

var _parser = require("./parser.js");

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _path = require("path");

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function () {
  let _G; // Generator 

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
    let psd = stringify(doc);

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
      const parse = new _parser.Parser(gDoc, _G, swipePath);
      const swipe = parse.getSwipe();

      let jsfilename = "main.js";
      let swipefilename = "main.swipe";
      // fs.writeFileSync(swipePath + "/" + jsfilename, stringify(swipe));
      fs.writeFileSync(swipePath + "/" + jsfilename, "callback(" + stringify(swipe) + ")");
      fs.writeFileSync(swipePath + "/" + swipefilename, stringify(swipe));
      copyIndex(swipePath);
      console.log("OK");
      // console.log(stringify(swipe));
    }, error);
  }
  function copyIndex(swipePath) {
    fs.createReadStream(__dirname + "/template/index.html").pipe(fs.createWriteStream(swipePath + "/index.html"));
    fs.createReadStream(__dirname + "/template/touch.html").pipe(fs.createWriteStream(swipePath + "/touch.html"));
  }
  module.exports.init = init;
})();