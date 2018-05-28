"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseElememtName = parseElememtName;
exports.parsePageName = parsePageName;
exports.formatParser = formatParser;
// opacity
// repeat
function parseElememtName(name) {
  const ret = {};
  name.split(/(\s|,)+/g).forEach(tags => {
    const properties = tags.split(":");
    const tagName = properties.shift();
    // console.log(tagName);
    // console.log(properties);
    // loop:style:aaa:count:123
    processObject("loop", tagName, properties, ret);
    processNumber("opacity", tagName, properties, ret);
    processBoolean("repeat", tagName, properties, ret);

    processString("bc", tagName, properties, ret);
  });
  return ret;
}

function processObject(name, tagName, properties, ret) {
  if (tagName.toLowerCase() === name) {
    const obj = {};
    while (properties.length > 1) {
      const spl = properties.splice(0, 2);
      obj[spl[0]] = spl[1];
    }
    ret[name] = obj;
  }
}
function processNumber(name, tagName, properties, ret) {
  if (tagName.toLowerCase() === name && !isNaN(Number(properties[0]))) {
    ret[name] = Number(properties[0]);
  }
}
function processString(name, tagName, properties, ret) {
  if (tagName.toLowerCase() === name && properties[0] !== undefined && properties[0] !== null) {
    if (ret) {
      ret[name] = properties[0];
    } else {
      return properties[0];
    }
  }
}
function processBoolean(name, tagName, properties, ret) {
  if (tagName.toLowerCase() === name && (properties[0].toLowerCase() === "true" || properties[0].toLowerCase() === "false")) {
    ret[name] = properties[0].toLowerCase() === "true";
  }
}

// transition:hoge play:hoge 
// duration:10 repeat:true
// vibrate
// audio
// speech
function parsePageName(name) {
  const ret = {};
  name.split(/(\s|,)+/g).forEach(tags => {
    const properties = tags.split(":");
    const tagName = properties.shift();
    processString("transition", tagName, properties, ret);
    processString("play", tagName, properties, ret);
    processNumber("duration", tagName, properties, ret);
    processBoolean("repeat", tagName, properties, ret);

    processString("bc", tagName, properties, ret);
    processBoolean("rewind", tagName, properties, ret);
    processBoolean("vibrate", tagName, properties, ret);
  });
  return ret;
}
const valid_formats = {
  "jpg": true,
  "png": true,
  "gif": true
};
function formatParser(name) {
  let default_format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "jpg";

  let ret = default_format;
  name.split(/(\s|,)+/g).forEach(tags => {
    const properties = tags.split(":");
    const tagName = properties.shift();
    let format = null;
    if ((format = processString("format", tagName, properties, null)) && valid_formats[format]) {
      ret = format;
    }
  });
  return ret;
}