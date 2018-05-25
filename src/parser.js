class Parser {
  constructor(doc, generator, swipePath) {
    // console.log(JSON.stringify(doc, null, 1));
    this.doc = doc;
    this.generator = generator;
    this.swipePath = swipePath;
  }

  getSwipe() {
    const pages = this.getPages()
    const dimension = (this.doc.bounds) ? [this.doc.bounds.right - this.doc.bounds.left, this.doc.bounds.bottom - this.doc.bounds.top] : [720, 1280];

    let swipe = {
	    type: "net.swipe.swipe",
	    title: "from photoshop",
	    dimension: dimension,
      pages: pages.pages,
      templates: {
        pages: pages.templates,
      },
    }
    return swipe;
  }
  getPages() {
    var ret = [];
    var i = 0;
    const doc = this.doc;
    const instance = this;

    const templates = {};
    if (doc && doc.layers) {
      doc.layers.forEach((layer) => {
        var pages = [];
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
        const res = this.getTemplates(pages);
        ret = ret.concat(res.pages);
        templates["s" + i] = res.templates;
        // console.log(JSON.stringify(template, null, 1));
        i = i + 1;
      });
    }
    return {pages: ret, templates: templates};
  }
  getTemplates(pages) {
    let _pages = [];
    let templatesCache = {}
    let templates = [];
    const instance = this;
    pages.forEach((page) => {
      let elements = [];
      if (page.elements) {
        page.elements.forEach((element) => {
          if (!templatesCache[element.id]) {
            let newElement =  Object.assign({}, element)
            delete newElement.id
            templatesCache[element.id] = newElement;
            templates.push(element);
            
            elements.push({id: element.id});
          } else {
            elements.push(instance.diffElement(templatesCache[element.id], element));
            templatesCache[element.id] = element;
          }
        });
      }
      _pages.push({elements: elements, scene: page.scene});
    });
    if (_pages.length > 0) {
      _pages[0].play = "auto";
    }
    return {templates: {elements: templates, play: "scroll"}, pages: _pages};
  }
  diffElement(oldElement, newElement) {
    // console.log(JSON.stringify(oldElement, null, 1));
    // console.log(JSON.stringify(newElement, null, 1));
    const elementDiff = {
      id: newElement.id,
      x: oldElement.x,
      y: oldElement.y,
      to: { translate:
            [newElement.x - oldElement.x,
             newElement.y - oldElement.y]
          },
    }
    if (newElement.h !== oldElement.h) {
      elementDiff.h = newElement.h;
    }
    if (newElement.w !== oldElement.w) {
      elementDiff.w = newElement.w;
    }
    return elementDiff;
  }
  parseElement(layer, doc) {
    const generator = this.generator;
    const instance = this;
    const swipePath = this.swipePath;
    var elem = {
      id: (layer.smartObject) ? layer.smartObject.ID : layer.id
    }
    if (layer.type === "textLayer") {
      elem.text = layer.text.textKey;
    }
    if (layer.type === "layer") {
      if (generator) {
        // todo  generate by smartObject and cache if exist
        var map = generator.getPixmap(doc.id, layer.id, { useJPGEncoding: true}).then((map) => {
          generator.savePixmap(map, swipePath + "/" + layer.id + ".jpg",
                               { ppi: 72, format: "jpg" });
        });
      }
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
      layer.layers.forEach((nestedLayer) => {
        if (nestedLayer.type !== "layerSection") { 
          elems.push(instance.parseElement(nestedLayer, doc));
        } else {
          ret = ret.concat(instance.parseLayer(nestedLayer, doc));
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
