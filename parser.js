"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = undefined;

var _name_parser = require("./name_parser.js");

var nameParser = _interopRequireWildcard(_name_parser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class Parser {
  constructor(doc, generator, swipePath) {
    // console.log(JSON.stringify(doc, null, 1));
    this.doc = doc;
    this.generator = generator;
    this.swipePath = swipePath;
    this.generatedImages = {};
  }

  getSwipe() {
    const pages = this.getPages();
    const dimension = this.doc.bounds ? [this.doc.bounds.right - this.doc.bounds.left, this.doc.bounds.bottom - this.doc.bounds.top] : [720, 1280];

    let swipe = {
      type: "net.swipe.swipe",
      title: "from photoshop",
      dimension: dimension,
      pages: pages.pages,
      templates: {
        pages: pages.templates
      }
    };
    return swipe;
  }
  getPages() {
    let ret = [];
    let i = 0;
    const doc = this.doc;
    const instance = this;

    const templates = {};
    if (doc && doc.layers) {
      doc.layers.forEach(layer => {
        let pages = [];
        if (layer.type !== "layerSection") {
          pages.push({
            elements: [instance.parseElement(layer, doc)],
            scene: "s" + i
          });
        } else {
          pages = instance.parseLayer(layer, doc).map(page => {
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
    return { pages: ret, templates: templates };
  }
  getTemplates(pages) {
    let _pages = [];
    let templatesCache = {};
    let templates = [];
    const instance = this;

    let prev_elements = {};
    let current_elements = {};

    let current_page = 0;
    pages.forEach(page => {
      let elements = [];
      if (page.elements) {
        page.elements.forEach(element => {
          const meta = nameParser.parseElememtName(element.name);
          delete element.name;

          if (element.smartObject) {
            delete element.smartObject;
            let status = "";
            let new_element = {};
            if (current_page > 0) {
              if (prev_elements[element.id]) {
                delete prev_elements[element.id];
              } else {
                status = "new";
              }
            }

            if (!templatesCache[element.id]) {
              let newElement = Object.assign({}, element);
              delete newElement.id;

              templatesCache[element.id] = newElement;

              element.opacity = 0;
              templates.push(element);

              if (status === "new") {
                new_element = instance.appearElement({ id: element.id });
              } else {
                new_element = { id: element.id, opacity: 1 };
              }
            } else {
              new_element = instance.diffElement(templatesCache[element.id], element);
              templatesCache[element.id] = element;
            }
            elements.push(Object.assign(new_element, meta));
            current_elements[element.id] = element;
          } else {
            delete element.smartObject;
            elements.push(element);
          }
        });
        Object.keys(prev_elements).map(key => {
          elements.push(instance.hideElement(prev_elements[key]));
        });
        prev_elements = current_elements;
        current_elements = {};
        current_page = current_page + 1;
      }
      const new_page = Object.assign({ elements: elements.reverse(), scene: page.scene }, nameParser.parsePageName(page.name));
      _pages.push(new_page);
    });
    if (_pages.length > 0) {
      _pages[0].play = "auto";
    }
    return { templates: { elements: templates.reverse(), play: "scroll" }, pages: _pages };
  }
  appearElement(element) {
    element.opacity = 0;
    element.to = {
      opacity: 1
    };
    return element;
  }
  hideElement(element) {
    element.opacity = 1;
    element.to = {
      opacity: 0
    };
    return element;
  }
  diffElement(oldElement, newElement) {
    const elementDiff = {
      id: newElement.id,
      x: oldElement.x,
      y: oldElement.y,
      opacity: 1,
      to: { translate: [newElement.x - oldElement.x, newElement.y - oldElement.y]
      }
    };
    if (newElement.h !== oldElement.h || newElement.w !== oldElement.w) {
      elementDiff.w = oldElement.w;
      elementDiff.h = oldElement.h;
      elementDiff.to.scale = [newElement.w / oldElement.w, newElement.h / oldElement.h];
      elementDiff.to.translate = [elementDiff.to.translate[0] + (newElement.w - oldElement.w) / 2, elementDiff.to.translate[1] + (newElement.h - oldElement.h) / 2];
    }
    return elementDiff;
  }
  parseElement(layer, doc) {
    const generator = this.generator;
    const instance = this;
    const swipePath = this.swipePath;
    const id = layer.smartObject ? layer.smartObject.ID : layer.id;
    let elem = {
      id: id,
      smartObject: layer.smartObject ? true : false,
      name: layer.name
    };
    if (layer.type === "textLayer") {
      elem.text = layer.text.textKey;
    }
    if (layer.type === "layer") {
      if (generator) {
        if (!this.generatedImages[id]) {
          if (layer.pixels) {
            generator.getPixmap(doc.id, layer.id, {}).then(map => {
              generator.savePixmap(map, swipePath + "/" + id + ".gif", { ppi: 72, format: "gif" });
            });
          } else {
            generator.getPixmap(doc.id, layer.id, { useJPGEncoding: true }).then(map => {
              generator.savePixmap(map, swipePath + "/" + id + ".jpg", { ppi: 72, format: "jpg" });
            });
          }

          this.generatedImages[id] = true;
        }
      }
      elem.img = id + (layer.pixels ? ".gif" : ".jpg");
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
    let ret = [];
    const instance = this;

    if (layer.layers) {
      let elems = [];
      layer.layers.forEach(nestedLayer => {
        if (nestedLayer.type !== "layerSection") {
          elems.push(instance.parseElement(nestedLayer, doc));
        } else {
          ret = ret.concat(instance.parseLayer(nestedLayer, doc));
        }
      });
      if (elems.length > 0) {
        ret.push({
          name: layer.name,
          elements: elems
        });
      }
    }
    return ret;
  }

}
exports.Parser = Parser;