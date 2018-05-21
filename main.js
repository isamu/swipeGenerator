(function () {
  "use strict";
  var _G // Generator 

  var MENU_GENERATOR_SWIPE = 'GENERATOR-SWIPE',
      docInfoFlags = {
        compInfo:             true,
        imageInfo:            true,
        layerInfo:            true,
        expandSmartObjects:   true,
        getTextStyles:        true,
        getFullTextStyles:    true,
        getCompLayerSettings: true,
        selectedLayers:       false,
        getDefaultLayerFX:    true,
        getPathData:          true
      };
  var fs = require("fs");
  var path = require("path");
  var _homeDirectory = process.env[(process.platform === "win32") ? "USERPROFILE" : "HOME"],
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
    
    _G.evaluateJSXFile(__dirname+'/jsx/copy.jsx', { clipboard: psd });
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
    var paths = doc.file.split("/");
    return _desktopDirectory + "/" + paths[paths.length -1].split(".")[0];
  }
  function onGeneratorDOMMenuClick(event) {
    _G.getDocumentInfo(null, docInfoFlags).then(
      function (gDoc) {
        var swipe_path = getDirName(gDoc);
        if (!fs.existsSync(swipe_path)) {
          fs.mkdirSync(swipe_path);
        }

        var ret = [];
        gDoc.layers.forEach((layer) => {
          ret.push({elements: parseLayer(layer, gDoc)});
        });
        var swipe = {
	        type: "net.swipe.swipe",
	        title: "from photoshop",
	        dimension: [720, 1280],
          pages: ret,
        }
        if (gDoc.bounds) {
          swipe.dimension = [gDoc.bounds.right - gDoc.bounds.left, gDoc.bounds.bottom - gDoc.bounds.top];
        }
        var filename = "main.swipe"
        // fs.writeFileSync(swipe_path + "/" + filename, stringify(swipe));
        fs.writeFileSync(swipe_path + "/" + filename, "callback(" + stringify(swipe) + ")");
        copy_index(swipe_path);
        // console.log(stringify(swipe));
      }, error);
  }
  function copy_index(swipe_path) {
    fs.createReadStream(__dirname + "/template/index.html").pipe(fs.createWriteStream(swipe_path + "/index.html"));
  }
  function parseLayer(layer, doc) {
    var ret = [];

    if (layer.type !== "layerSection") {
      var elem = {
        id: layer.id,
      }
      if (layer.type === "textLayer") {
        elem.text = layer.text.textKey;
      }
      if (layer.type === "layer") {
        var map = _G.getPixmap(doc.id, layer.id, { useJPGEncoding: true}).then((map) => {
          var swipe_path = getDirName(doc);
          _G.savePixmap(map, swipe_path + "/" + layer.id + ".jpg",
                        { ppi: 72, format: "jpg" });
        });
      }
      if (layer.smartObject ) {
        elem.img = layer.id + ".jpg";
      }
      if (layer.bounds) {
        elem.y = layer.bounds.top;
        elem.x = layer.bounds.left;
        elem.h = layer.bounds.bottom - layer.bounds.top;
        elem.w = layer.bounds.right - layer.bounds.left;
      }
      ret.push(elem);
    }
    if (layer.layers) {
      layer.layers.forEach((nested_layer) => { 
        ret = ret.concat(parseLayer(nested_layer, doc));
      });
    }
    return ret;
  }
  module.exports.init = init;
}());
