class Parser {
  constructor(doc, generator, path_prefix) {
    this.doc = doc;
    this.generator = generator;
    this.path_prefix = path_prefix;
  }

  getPages() {
    var ret = [];
    var i = 0;
    const doc = this.doc;
    const instance = this;
    doc.layers.forEach((layer) => {
      var page = [];
      if (layer.type !== "layerSection") {
        pages.push({
          elements: [instance.parseElement(layer, doc)],
          scene: "s" + i,
        });
      } else {
        pages = instance.parseLayer(layer, doc).map((page) => {
          page["scene"] = "s" + i;
          return page;
        });
      }
      ret = ret.concat(pages);
      
      i = i + 1;
    });
    return ret;
  }
  getDirName(doc) {
    var paths = doc.file.split("/");
    return this.path_prefix + "/" + paths[paths.length -1].split(".")[0];
  }
  parseElement(layer, doc) {
    const generator = this.generator;
    const instance = this;
    var elem = {
      id: (layer.smartObject) ? layer.smartObject.ID : layer.id
    }
    if (layer.type === "textLayer") {
      elem.text = layer.text.textKey;
    }
    if (layer.type === "layer") {
      var map = generator.getPixmap(doc.id, layer.id, { useJPGEncoding: true}).then((map) => {
        var swipe_path = instance.getDirName(doc);
        generator.savePixmap(map, swipe_path + "/" + layer.id + ".jpg",
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
    return elem;
  }
  // return array
  parseLayer(layer, doc) {
    var ret = [];
    const instance = this;
    
    if (layer.layers) {
      var elems = [];
      layer.layers.forEach((nested_layer) => {
        if (nested_layer.type !== "layerSection") { 
          elems.push(instance.parseElement(nested_layer, doc));
        } else {
          ret = ret.concat(instance.parseLayer(nested_layer, doc));
        }
      });
      if (elems.length > 0) {
        ret.push({elements: elems});
      }
    }
    return ret;
  }
  
}

module.exports = Parser
