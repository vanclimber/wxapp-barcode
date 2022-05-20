(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["default"] = {}));
})(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _SET_BY_CODE;

  // constants for internal usage
  var SET_A = 0;
  var SET_B = 1;
  var SET_C = 2; // Special characters

  var SHIFT = 98;
  var START_A = 103;
  var START_B = 104;
  var START_C = 105;
  var MODULO = 103;
  var STOP = 106;

  var SET_BY_CODE = (_SET_BY_CODE = {}, _defineProperty(_SET_BY_CODE, START_A, SET_A), _defineProperty(_SET_BY_CODE, START_B, SET_B), _defineProperty(_SET_BY_CODE, START_C, SET_C), _SET_BY_CODE); // Get next set by code

  var SWAP = {
    101: SET_A,
    100: SET_B,
    99: SET_C
  };
  var A_START_CHAR = String.fromCharCode(208); // START_A + 105

  var B_START_CHAR = String.fromCharCode(209); // START_B + 105

  var C_START_CHAR = String.fromCharCode(210); // START_C + 105
  // 128A (Code Set A)
  // ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4

  var A_CHARS = "[\x00-\x5F\xC8-\xCF]"; // 128B (Code Set B)
  // ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4

  var B_CHARS = "[\x20-\x7F\xC8-\xCF]"; // 128C (Code Set C)
  // 00–99 (encodes two digits with a single code point) and FNC1

  var C_CHARS = "(\xCF*[0-9]{2}\xCF*)"; // CODE128 includes 107 symbols:
  // 103 data symbols, 3 start symbols (A, B and C), and 1 stop symbol (the last one)

  var PATTERNS = [[2, 1, 2, 2, 2, 2, 0, 0], // 0
  [2, 2, 2, 1, 2, 2, 0, 0], // 1
  [2, 2, 2, 2, 2, 1, 0, 0], // 2
  [1, 2, 1, 2, 2, 3, 0, 0], // 3
  [1, 2, 1, 3, 2, 2, 0, 0], // 4
  [1, 3, 1, 2, 2, 2, 0, 0], // 5
  [1, 2, 2, 2, 1, 3, 0, 0], // 6
  [1, 2, 2, 3, 1, 2, 0, 0], // 7
  [1, 3, 2, 2, 1, 2, 0, 0], // 8
  [2, 2, 1, 2, 1, 3, 0, 0], // 9
  [2, 2, 1, 3, 1, 2, 0, 0], // 10
  [2, 3, 1, 2, 1, 2, 0, 0], // 11
  [1, 1, 2, 2, 3, 2, 0, 0], // 12
  [1, 2, 2, 1, 3, 2, 0, 0], // 13
  [1, 2, 2, 2, 3, 1, 0, 0], // 14
  [1, 1, 3, 2, 2, 2, 0, 0], // 15
  [1, 2, 3, 1, 2, 2, 0, 0], // 16
  [1, 2, 3, 2, 2, 1, 0, 0], // 17
  [2, 2, 3, 2, 1, 1, 0, 0], // 18
  [2, 2, 1, 1, 3, 2, 0, 0], // 19
  [2, 2, 1, 2, 3, 1, 0, 0], // 20
  [2, 1, 3, 2, 1, 2, 0, 0], // 21
  [2, 2, 3, 1, 1, 2, 0, 0], // 22
  [3, 1, 2, 1, 3, 1, 0, 0], // 23
  [3, 1, 1, 2, 2, 2, 0, 0], // 24
  [3, 2, 1, 1, 2, 2, 0, 0], // 25
  [3, 2, 1, 2, 2, 1, 0, 0], // 26
  [3, 1, 2, 2, 1, 2, 0, 0], // 27
  [3, 2, 2, 1, 1, 2, 0, 0], // 28
  [3, 2, 2, 2, 1, 1, 0, 0], // 29
  [2, 1, 2, 1, 2, 3, 0, 0], // 30
  [2, 1, 2, 3, 2, 1, 0, 0], // 31
  [2, 3, 2, 1, 2, 1, 0, 0], // 32
  [1, 1, 1, 3, 2, 3, 0, 0], // 33
  [1, 3, 1, 1, 2, 3, 0, 0], // 34
  [1, 3, 1, 3, 2, 1, 0, 0], // 35
  [1, 1, 2, 3, 1, 3, 0, 0], // 36
  [1, 3, 2, 1, 1, 3, 0, 0], // 37
  [1, 3, 2, 3, 1, 1, 0, 0], // 38
  [2, 1, 1, 3, 1, 3, 0, 0], // 39
  [2, 3, 1, 1, 1, 3, 0, 0], // 40
  [2, 3, 1, 3, 1, 1, 0, 0], // 41
  [1, 1, 2, 1, 3, 3, 0, 0], // 42
  [1, 1, 2, 3, 3, 1, 0, 0], // 43
  [1, 3, 2, 1, 3, 1, 0, 0], // 44
  [1, 1, 3, 1, 2, 3, 0, 0], // 45
  [1, 1, 3, 3, 2, 1, 0, 0], // 46
  [1, 3, 3, 1, 2, 1, 0, 0], // 47
  [3, 1, 3, 1, 2, 1, 0, 0], // 48
  [2, 1, 1, 3, 3, 1, 0, 0], // 49
  [2, 3, 1, 1, 3, 1, 0, 0], // 50
  [2, 1, 3, 1, 1, 3, 0, 0], // 51
  [2, 1, 3, 3, 1, 1, 0, 0], // 52
  [2, 1, 3, 1, 3, 1, 0, 0], // 53
  [3, 1, 1, 1, 2, 3, 0, 0], // 54
  [3, 1, 1, 3, 2, 1, 0, 0], // 55
  [3, 3, 1, 1, 2, 1, 0, 0], // 56
  [3, 1, 2, 1, 1, 3, 0, 0], // 57
  [3, 1, 2, 3, 1, 1, 0, 0], // 58
  [3, 3, 2, 1, 1, 1, 0, 0], // 59
  [3, 1, 4, 1, 1, 1, 0, 0], // 60
  [2, 2, 1, 4, 1, 1, 0, 0], // 61
  [4, 3, 1, 1, 1, 1, 0, 0], // 62
  [1, 1, 1, 2, 2, 4, 0, 0], // 63
  [1, 1, 1, 4, 2, 2, 0, 0], // 64
  [1, 2, 1, 1, 2, 4, 0, 0], // 65
  [1, 2, 1, 4, 2, 1, 0, 0], // 66
  [1, 4, 1, 1, 2, 2, 0, 0], // 67
  [1, 4, 1, 2, 2, 1, 0, 0], // 68
  [1, 1, 2, 2, 1, 4, 0, 0], // 69
  [1, 1, 2, 4, 1, 2, 0, 0], // 70
  [1, 2, 2, 1, 1, 4, 0, 0], // 71
  [1, 2, 2, 4, 1, 1, 0, 0], // 72
  [1, 4, 2, 1, 1, 2, 0, 0], // 73
  [1, 4, 2, 2, 1, 1, 0, 0], // 74
  [2, 4, 1, 2, 1, 1, 0, 0], // 75
  [2, 2, 1, 1, 1, 4, 0, 0], // 76
  [4, 1, 3, 1, 1, 1, 0, 0], // 77
  [2, 4, 1, 1, 1, 2, 0, 0], // 78
  [1, 3, 4, 1, 1, 1, 0, 0], // 79
  [1, 1, 1, 2, 4, 2, 0, 0], // 80
  [1, 2, 1, 1, 4, 2, 0, 0], // 81
  [1, 2, 1, 2, 4, 1, 0, 0], // 82
  [1, 1, 4, 2, 1, 2, 0, 0], // 83
  [1, 2, 4, 1, 1, 2, 0, 0], // 84
  [1, 2, 4, 2, 1, 1, 0, 0], // 85
  [4, 1, 1, 2, 1, 2, 0, 0], // 86
  [4, 2, 1, 1, 1, 2, 0, 0], // 87
  [4, 2, 1, 2, 1, 1, 0, 0], // 88
  [2, 1, 2, 1, 4, 1, 0, 0], // 89
  [2, 1, 4, 1, 2, 1, 0, 0], // 90
  [4, 1, 2, 1, 2, 1, 0, 0], // 91
  [1, 1, 1, 1, 4, 3, 0, 0], // 92
  [1, 1, 1, 3, 4, 1, 0, 0], // 93
  [1, 3, 1, 1, 4, 1, 0, 0], // 94
  [1, 1, 4, 1, 1, 3, 0, 0], // 95
  [1, 1, 4, 3, 1, 1, 0, 0], // 96
  [4, 1, 1, 1, 1, 3, 0, 0], // 97
  [4, 1, 1, 3, 1, 1, 0, 0], // 98
  [1, 1, 3, 1, 4, 1, 0, 0], // 99
  [1, 1, 4, 1, 3, 1, 0, 0], // 100
  [3, 1, 1, 1, 4, 1, 0, 0], // 101
  [4, 1, 1, 1, 3, 1, 0, 0], // 102
  [2, 1, 1, 4, 1, 2, 0, 0], // 103
  [2, 1, 1, 2, 1, 4, 0, 0], // 104
  [2, 1, 1, 2, 3, 2, 0, 0], // 105
  [2, 3, 3, 1, 1, 1, 2, 0] // 106
  ];

  var matchSetALength = function matchSetALength(string) {
    return string.match(new RegExp("^".concat(A_CHARS, "*")))[0].length;
  };

  var matchSetBLength = function matchSetBLength(string) {
    return string.match(new RegExp("^".concat(B_CHARS, "*")))[0].length;
  };

  var matchSetC = function matchSetC(string) {
    return string.match(new RegExp("^".concat(C_CHARS, "*")))[0];
  }; // CODE128A or CODE128B


  function autoSelectFromAB(string, isA) {
    var ranges = isA ? A_CHARS : B_CHARS;
    var untilC = string.match(new RegExp("^(".concat(ranges, "+?)(([0-9]{2}){2,})([^0-9]|$)")));

    if (untilC) {
      return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
    }

    var chars = string.match(new RegExp("^".concat(ranges, "+")))[0];

    if (chars.length === string.length) {
      return string;
    }

    return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
  } // CODE128C


  function autoSelectFromC(string) {
    var cMatch = matchSetC(string);
    var length = cMatch.length;

    if (length === string.length) {
      return string;
    }

    string = string.substring(length); // Select A/B depending on the longest match

    var isA = matchSetALength(string) >= matchSetBLength(string);
    return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
  } // Detect Code Set (A, B or C) and format the string


  function auto(string) {
    var newString;
    var cLength = matchSetC(string).length; // Select 128C if the string start with enough digits

    if (cLength >= 2) {
      newString = C_START_CHAR + autoSelectFromC(string);
    } else {
      // Select A/B depending on the longest match
      var isA = matchSetALength(string) > matchSetBLength(string);
      newString = (isA ? A_START_CHAR : B_START_CHAR) + autoSelectFromAB(string, isA);
    } // return newString.replace(
    // 	/[\xCD\xCE]([^])[\xCD\xCE]/, // Any sequence between 205 and 206 characters
    // 	(match, char) => String.fromCharCode(203) + char
    // );


    return newString;
  }

  function encode(text, options) {
    // const { format = "CODE128", ena128 = false } = options;
    var format = "CODE128";
    var newText = "";
    var bytes = [];

    switch (format) {
      case "CODE128A":
        break;

      default:
        newText = auto(text);
        break;
    }

    bytes = newText.split("").map(function (_char) {
      return _char.charCodeAt(0);
    }); // Remove the start code from the bytes and set its index

    var startIndex = bytes.shift() - 105; // Get start set by index

    var startSet = SET_BY_CODE[startIndex];

    if (startSet === undefined) {
      throw new RangeError("The encoding does not start with a start character.");
    }

    var result = [],
        checksum = 0,
        pos = 1,
        set = startSet;

    while (bytes.length > 0) {
      var index = void 0; // Special characters

      if (bytes[0] >= 200) {
        index = bytes.shift() - 105;
        var nextSet = SWAP[index]; // Swap to other set

        if (nextSet !== undefined) {
          set = nextSet;
        } // Continue on current set but encode a special character
        else {
          // Shift
          if ((set === SET_A || set === SET_B) && index === SHIFT) {
            // Convert the next character so that is encoded correctly
            bytes[0] = set === SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] // bytes[0] is type B
            : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
          }
        }
      } // Continue encoding
      else {
        index = correctIndex(bytes, set);
      }

      result.push(index);
      checksum += index * pos;
      pos++;
    }

    result.unshift(startIndex);
    result = result.concat([(checksum + startIndex) % MODULO, STOP]);
    return result;
  } // Correct an index by a set and shift it from the bytes array


  function correctIndex(bytes, set) {
    if (set === SET_A) {
      var charCode = bytes.shift();
      return charCode < 32 ? charCode + 64 : charCode - 32;
    } else if (set === SET_B) {
      return bytes.shift() - 32;
    } else {
      return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
    }
  }

  var Graphics = /*#__PURE__*/function () {
    function Graphics(ctx, options) {
      _classCallCheck(this, Graphics);

      var _options$autoFill = options.autoFill,
          autoFill = _options$autoFill === void 0 ? true : _options$autoFill,
          width = options.width,
          height = options.height,
          _options$lineWidth = options.lineWidth,
          lineWidth = _options$lineWidth === void 0 ? 2 : _options$lineWidth,
          _options$lineHeight = options.lineHeight,
          lineHeight = _options$lineHeight === void 0 ? 100 : _options$lineHeight,
          _options$paddingLeft = options.paddingLeft,
          paddingLeft = _options$paddingLeft === void 0 ? 10 : _options$paddingLeft,
          _options$paddingRight = options.paddingRight,
          paddingRight = _options$paddingRight === void 0 ? 10 : _options$paddingRight,
          _options$paddingTop = options.paddingTop,
          paddingTop = _options$paddingTop === void 0 ? 0 : _options$paddingTop,
          _options$paddingBotto = options.paddingBottom,
          paddingBottom = _options$paddingBotto === void 0 ? 0 : _options$paddingBotto,
          _options$lineColor = options.lineColor,
          lineColor = _options$lineColor === void 0 ? "#000000" : _options$lineColor;
          options.backgroundColor;
      this.autoFill = autoFill;

      if (autoFill) {
        // const dpr = wx.getSystemInfoSync().pixelRatio;
        var trueDpr = 750 / wx.getSystemInfoSync().windowWidth;
        var pixelWidth = Math.round(width / trueDpr);
        var pixelHeight = Math.round(height / trueDpr);
        this.width = pixelWidth - paddingLeft - paddingRight;
        this.height = pixelHeight - paddingTop - paddingBottom;
      } else {
        this.lineWidth = lineWidth;
        this.lineHeight = lineHeight;
      }

      this.area = {
        top: paddingTop,
        left: paddingLeft
      };
      ctx.fillStyle = lineColor;
      this.ctx = ctx;
    }

    _createClass(Graphics, [{
      key: "draw",
      value: function draw(codes) {
        var _ctx$draw;

        var ctx = this.ctx,
            autoFill = this.autoFill;
        var lineWidth, lineHeight;

        if (autoFill) {
          lineWidth = this.width / (codes.length * 11 + 2);
          lineHeight = this.height;
        } else {
          lineWidth = this.lineWidth;
          lineHeight = this.lineHeight;
        }

        var x = this.area.left;
        var y = this.area.top;

        for (var i = 0; i < codes.length; i++) {
          var item = codes[i]; //two bars at a time: 1 black and 1 white

          for (var bar = 0; bar < 8; bar += 2) {
            var barW = PATTERNS[item][bar] * lineWidth;
            var spcW = PATTERNS[item][bar + 1] * lineWidth; //no need to draw if 0 width

            if (barW > 0) {
              ctx.fillRect(x, y, barW, lineHeight);
            }

            x += barW + spcW;
          }
        } // 新的canvas接口没有draw函数


        (_ctx$draw = ctx.draw) === null || _ctx$draw === void 0 ? void 0 : _ctx$draw.call(ctx);
      }
    }]);

    return Graphics;
  }();

  var code128 = function code128(ctx, text, options) {
    var codes = encode(text);
    var g = new Graphics(ctx, options);
    g.draw(codes);
  };

  function CODE128(selector) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var component = arguments.length > 3 ? arguments[3] : undefined;
    var canvasType = options.canvasType;

    if (text.length <= 0) {
      console.warn("[wxapp-barcode]: text should not empty or nullish");
      return;
    }

    if (canvasType === "2d") {
      var _component$createSele;

      var query = (component === null || component === void 0 ? void 0 : (_component$createSele = component.createSelectorQuery) === null || _component$createSele === void 0 ? void 0 : _component$createSele.call(component)) || wx.createSelectorQuery();
      query.select(selector).fields({
        node: true,
        size: true
      }).exec(function (res) {
        var _res$;

        var node = (_res$ = res[0]) === null || _res$ === void 0 ? void 0 : _res$.node;

        if (node) {
          var width = options.width,
              height = options.height; // pixelRatio并不等于真实的设备像素比
          // const dpr = wx.getSystemInfoSync().pixelRatio;

          var ctx = node.getContext("2d"); // 解决高清屏模糊问题

          var trueDpr = 750 / wx.getSystemInfoSync().windowWidth;
          node.width = width;
          node.height = height;
          ctx.scale(trueDpr, trueDpr);
          code128(ctx, "".concat(text), options);
        } else {
          console.warn("[wxapp-barcode]: have not found this node by this selector: ".concat(selector));
        }
      });
    } else {
      var ctx = wx.createCanvasContext(selector, component);
      code128(ctx, "".concat(text), options);
    }
  }

  exports.CODE128 = CODE128;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
