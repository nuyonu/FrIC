"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class Fric {
  constructor(key) {
    Object.defineProperty(this, _fractalsArray, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _address, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _key, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _fetch, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _results, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _fractalsArray)[_fractalsArray] = [];
    _classPrivateFieldLooseBase(this, _results)[_results] = [];

    if (Fric.isValid(key)) {
      this.key = key;
    }
  } // axiom=F&angle=22.5&rules=F%20-%3E%20FF%2B%5B%2BF-F-F%5D-%5B-F%2BF%2BF%5D&depth=6&format=png


  AddFractal(fractal) {
    this.fractalsArray.push(fractal);
  }

  AddFractals(fractals) {
    for (let i = 0; i < fractals.length; i++) {
      this.fractalsArray.push(fractals[i]);
    }
  }

  static isValid(key) {
    if (typeof key == "undefined") {
      return true;
    } else if (typeof key != "string") throw "Parameter key is not a valid parameter";else if (key.length !== 64) throw "The key is not valid";

    return true;
  }

  async makeRequest() {
    let downloadAssets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    let result;

    for (let i = 0; i < _classPrivateFieldLooseBase(this, _fractalsArray)[_fractalsArray].length; i++) {
      result = await fetch(Constants.Address + "?axiom=F&angle=22.5&rules=&depth=1&format=png&rules=F%20-%3E%20FF%2B%5B%2BF-F-F%5D-%5B-F%2BF%2BF%5D").then(res => res.json()).then(json => {
        return json;
      });

      _classPrivateFieldLooseBase(this, _results)[_results].push(new Result(result));
    }
  }

  load(index, id) {
    if (typeof index !== "number") throw "index should be a positive integer";
    if (index < 0 || index > _classPrivateFieldLooseBase(this, _fractalsArray)[_fractalsArray].length) throw "Invalid index for list of fractals";

    let format = _classPrivateFieldLooseBase(this, _fractalsArray)[_fractalsArray][index].format;

    switch (format) {
      case "pdf":
        console.log("Not implemented");
        break;

      case "jpeg":
        console.log("Not implemented");
        break;

      case "canvas":
        console.log("Not implemented");
        break;
    }
  }

}

var _fractalsArray = _classPrivateFieldLooseKey("fractalsArray");

var _address = _classPrivateFieldLooseKey("address");

var _key = _classPrivateFieldLooseKey("key");

var _fetch = _classPrivateFieldLooseKey("fetch");

var _results = _classPrivateFieldLooseKey("results");

class Constants {
  static get Address() {
    return "https://dsqdzkf7h2.execute-api.eu-central-1.amazonaws.com/prod/fractal";
  }

  static get formats() {
    return _classPrivateFieldLooseBase(this, _formats)[_formats];
  }

  static isValidFormats(format) {
    return _classPrivateFieldLooseBase(this, _formats)[_formats].indexOf(format) !== -1;
  }

}

var _formats = _classPrivateFieldLooseKey("formats");

Object.defineProperty(Constants, _formats, {
  writable: true,
  value: ["pdf", "jpeg", "canvas", "png"]
});

class Config {
  constructor() {
    Object.defineProperty(this, _axiom, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _rules, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _angle, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _depth, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _format, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _rules)[_rules] = new Array();
  }

  get depth() {
    if (_classPrivateFieldLooseBase(this, _depth)[_depth] === undefined) {
      console.warn("The depth is not precised. Default depth will be used: 2");
      return 2;
    }

    return _classPrivateFieldLooseBase(this, _depth)[_depth];
  }

  get format() {
    if (_classPrivateFieldLooseBase(this, _format)[_format] === undefined) {
      console.warn("No format precised. Default format will be used: png");
      return 'png';
    }

    return _classPrivateFieldLooseBase(this, _format)[_format];
  }

  get angle() {
    if (_classPrivateFieldLooseBase(this, _angle)[_angle] === undefined) {
      console.warn("No angle precised.Default angle will be used :45");
      return 45;
    }

    return _classPrivateFieldLooseBase(this, _angle)[_angle];
  }

  get axiom() {
    if (_classPrivateFieldLooseBase(this, _axiom)[_axiom] === undefined) {
      throw "A fractal need to have a axiom";
    }

    return _classPrivateFieldLooseBase(this, _axiom)[_axiom];
  }

  get rules() {
    if (_classPrivateFieldLooseBase(this, _rules)[_rules].length === 0) {
      throw "A fractal need to have at least a rule";
    }

    return _classPrivateFieldLooseBase(this, _rules)[_rules];
  }

  SetFormat(format) {
    if (typeof format != "string") throw "required parameter \"format\" need to be a string";

    if (Constants.Constants.isValidFormats(format)) {
      _classPrivateFieldLooseBase(this, _format)[_format] = format;
      return this;
    } else throw "Error:Invalid format requested" + "\nInfo: Valid format are: " + Constants.Constants.formats.toString();
  }

  SetDepth(depth) {
    if (typeof depth !== 'number') throw "Error: Depth need to be a positive integer";
    if (depth < 0) throw "Error: Depth need to be a positive integer";
    if (Number(depth) !== depth || depth % 1 !== 0) throw "Error: Depth need to be a positive integer";
    _classPrivateFieldLooseBase(this, _depth)[_depth] = depth;
  }

  SetAngle(angle) {
    if (typeof angle != "number") throw "required parameter \"angle\" need to be a number";
    _classPrivateFieldLooseBase(this, _angle)[_angle] = angle;
    return this;
  }

  SetAxiom(axiom) {
    if (typeof axiom != "string") throw "required parameter \"axiom\" need to be a string";
    if (axiom.length === 0) throw "Error: axiom string is empty";
    _classPrivateFieldLooseBase(this, _axiom)[_axiom] = axiom;
    return this;
  }

  AddRule(rule) {
    if (typeof rule != "string") throw "required parameter \"rule\" need to be a string";
    if (rule.length === 0) throw "Error: rule string is empty";

    _classPrivateFieldLooseBase(this, _rules)[_rules].push(rule);

    return this;
  }

  Completed() {}

}

var _axiom = _classPrivateFieldLooseKey("axiom");

var _rules = _classPrivateFieldLooseKey("rules");

var _angle = _classPrivateFieldLooseKey("angle");

var _depth = _classPrivateFieldLooseKey("depth");

var _format = _classPrivateFieldLooseKey("format");

class Data {
  constructor(data) {
    Object.defineProperty(this, _fractalString, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _lengthStringFractal, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _depth2, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _link, {
      writable: true,
      value: void 0
    });
    let payload = data['payload'];
    _classPrivateFieldLooseBase(this, _fractalString)[_fractalString] = payload['result'];
    _classPrivateFieldLooseBase(this, _lengthStringFractal)[_lengthStringFractal] = payload['length'];
    _classPrivateFieldLooseBase(this, _depth2)[_depth2] = payload['depth'];
    _classPrivateFieldLooseBase(this, _link)[_link] = payload['imageLink'];
  }

  get fractalString() {
    return _classPrivateFieldLooseBase(this, _fractalString)[_fractalString];
  }

  get lengthStringFractal() {
    return _classPrivateFieldLooseBase(this, _lengthStringFractal)[_lengthStringFractal];
  }

  get depth() {
    return _classPrivateFieldLooseBase(this, _depth2)[_depth2];
  }

  get link() {
    return _classPrivateFieldLooseBase(this, _link)[_link];
  }

}

var _fractalString = _classPrivateFieldLooseKey("fractalString");

var _lengthStringFractal = _classPrivateFieldLooseKey("lengthStringFractal");

var _depth2 = _classPrivateFieldLooseKey("depth");

var _link = _classPrivateFieldLooseKey("link");

class ResultBase {
  constructor(result) {
    Object.defineProperty(this, _success, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _data, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _time, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _why, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _success)[_success] = result['status'] === 'success';

    if (!_classPrivateFieldLooseBase(this, _success)[_success]) {
      _classPrivateFieldLooseBase(this, _why)[_why] = result['data'];
    } else {
      _classPrivateFieldLooseBase(this, _data)[_data] = new Data(result['data']);
      _classPrivateFieldLooseBase(this, _time)[_time] = new Timings(result['data']); // var a=1;
    }
  }

  get success() {
    return _classPrivateFieldLooseBase(this, _success)[_success];
  }

  get data() {
    return _classPrivateFieldLooseBase(this, _data)[_data];
  }

  get time() {
    return _classPrivateFieldLooseBase(this, _time)[_time];
  }

  get message() {
    return _classPrivateFieldLooseBase(this, _why)[_why];
  }

}

var _success = _classPrivateFieldLooseKey("success");

var _data = _classPrivateFieldLooseKey("data");

var _time = _classPrivateFieldLooseKey("time");

var _why = _classPrivateFieldLooseKey("why");

class Timings {
  constructor(time) {
    Object.defineProperty(this, _totalTime, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _uploadTime, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _drawingTime, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _linesGenerationTime, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _stringGenerationTime, {
      writable: true,
      value: 0
    });
    time = time['timings'];
    _classPrivateFieldLooseBase(this, _totalTime)[_totalTime] = time['stringGenerationTime'];
    _classPrivateFieldLooseBase(this, _uploadTime)[_uploadTime] = time['linesGenerationTime'];
    _classPrivateFieldLooseBase(this, _drawingTime)[_drawingTime] = time['drawingTime'];
    _classPrivateFieldLooseBase(this, _linesGenerationTime)[_linesGenerationTime] = time['uploadingTime'];
    _classPrivateFieldLooseBase(this, _stringGenerationTime)[_stringGenerationTime] = time['totalTime'];
  }

  get totalTime() {
    return _classPrivateFieldLooseBase(this, _totalTime)[_totalTime];
  }

  get uploadTime() {
    return _classPrivateFieldLooseBase(this, _uploadTime)[_uploadTime];
  }

  get drawingTime() {
    return _classPrivateFieldLooseBase(this, _drawingTime)[_drawingTime];
  }

  get linesGenerationTime() {
    return _classPrivateFieldLooseBase(this, _linesGenerationTime)[_linesGenerationTime];
  }

  get stringGenerationTime() {
    return _classPrivateFieldLooseBase(this, _stringGenerationTime)[_stringGenerationTime];
  }

}

var _totalTime = _classPrivateFieldLooseKey("totalTime");

var _uploadTime = _classPrivateFieldLooseKey("uploadTime");

var _drawingTime = _classPrivateFieldLooseKey("drawingTime");

var _linesGenerationTime = _classPrivateFieldLooseKey("linesGenerationTime");

var _stringGenerationTime = _classPrivateFieldLooseKey("stringGenerationTime");

var _default = {
  Fric,
  Config,
  Data,
  ResultBase,
  Timings
};
exports.default = _default;