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
    _G.getDocumentInfo(null, docInfoFlags).then(function (gDoc) {
      const swipe_path = getDirName(gDoc);
      if (!fs.existsSync(swipe_path)) {
        fs.mkdirSync(swipe_path);
      }
      const parse = new Parser(gDoc, _G, _desktopDirectory);

      var swipe = {
        type: "net.swipe.swipe",
        title: "from photoshop",
        dimension: [720, 1280],
        pages: parse.getPages()
      };
      if (gDoc.bounds) {
        swipe.dimension = [gDoc.bounds.right - gDoc.bounds.left, gDoc.bounds.bottom - gDoc.bounds.top];
      }
      var filename = "main.swipe";
      // fs.writeFileSync(swipe_path + "/" + filename, stringify(swipe));
      fs.writeFileSync(swipe_path + "/" + filename, "callback(" + stringify(swipe) + ")");
      copy_index(swipe_path);
      // console.log(stringify(swipe));
    }, error);
  }
  function copy_index(swipe_path) {
    fs.createReadStream(__dirname + "/template/index.html").pipe(fs.createWriteStream(swipe_path + "/index.html"));
  }
  module.exports.init = init;
})();