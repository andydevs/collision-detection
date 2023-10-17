/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/array.js":
/*!**********************!*\
  !*** ./app/array.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   linearBreaks: () => (/* binding */ linearBreaks),
/* harmony export */   numberRange: () => (/* binding */ numberRange),
/* harmony export */   permutations: () => (/* binding */ permutations),
/* harmony export */   uniquePairs: () => (/* binding */ uniquePairs)
/* harmony export */ });
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

/**
 * Return range of numbers from start to stop in increments of step
 * 
 * @param {int} start start (or stop) of range (start defaults to 0 if not specified)
 * @param {int} stop final number of range
 * @param {int} step increment step
 */
function numberRange(start) {
  var stop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (stop === undefined) {
    stop = start;
    start = 0;
  }
  return Array.from({
    length: Math.ceil((stop - start) / step)
  }, function (_, i) {
    return start + i * step;
  });
}

/**
 * Generate pairs of items so that no to items 
 * appear more than once as a pair in either order
 * 
 * @param {Array} items items to pair up
 * 
 * @returns unique pairs of items
 */
function uniquePairs(items) {
  return items.flatMap(function (a, i) {
    return items.slice(i + 1).map(function (b) {
      return [a, b];
    });
  });
}

/**
 * Return array containing all permutations of items in each array
 * 
 * @param {Array} array1 first array to pair up
 * @param {Array} array2 second array to pair up
 * 
 * @returns pairs of arrays 
 */
function permutations(array1, array2) {
  return array1.flatMap(function (e1) {
    return array2.map(function (e2) {
      return [e1, e2];
    });
  });
}

/**
 * Return array of n breakpoints linearly between 
 * start and stop index including stop index
 * 
 * @param {int} start starting integer index
 * @param {int} stop ending integer index
 * @param {int} n number of breaks
 * 
 * @returns {Array} array of breakpoints
 */
function linearBreaks(start, stop, n) {
  var step = (stop - start) / (n - 1);
  return Array.from({
    length: n
  }, function (_, i) {
    return start + step * i;
  });
}

/***/ }),

/***/ "./app/clock.js":
/*!**********************!*\
  !*** ./app/clock.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Clock: () => (/* binding */ Clock)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

var Clock = /*#__PURE__*/function () {
  function Clock() {
    _classCallCheck(this, Clock);
    this.last = null;
    this.time = Date.now();
  }
  _createClass(Clock, [{
    key: "tick",
    value: function tick() {
      this.last = this.time;
      this.time = Date.now();
    }
  }, {
    key: "delta",
    get: function get() {
      return this.time - this.last;
    }
  }, {
    key: "framerate",
    get: function get() {
      return Math.floor(1000 / this.delta);
    }
  }]);
  return Clock;
}();

/***/ }),

/***/ "./app/controls.js":
/*!*************************!*\
  !*** ./app/controls.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controls: () => (/* binding */ Controls)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

var Controls = /*#__PURE__*/function () {
  function Controls() {
    _classCallCheck(this, Controls);
    console.groupCollapsed('new Controls');
    this._frameDeltaEntry = document.querySelector('#delta');
    this._framerateEntry = document.querySelector('#framerate');
    this._cpsEntry = document.querySelector('#cps');
    this._numberBalls = document.querySelector('#number-balls');
    this._sizeBias = document.querySelector('#size-bias');
    this._generateButton = document.querySelector('#generate-balls');
    this._collisionCheck = document.querySelector('#show-collision');
    this._partitionCheck = document.querySelector('#show-partitions');
    this._partitionType = document.querySelector('#partition-type');

    // Load from localstorage
    this.loadStorage();
    this.initializeSaveStorageCallback();
  }
  _createClass(Controls, [{
    key: "loadStorage",
    value: function loadStorage() {
      // Load from localstorage
      console.log('Checking localstorage for', Controls.storageKey);
      var savedStateJSON = localStorage.getItem(Controls.storageKey);
      if (savedStateJSON) {
        console.log('Loaded data from state');
        console.log(savedStateJSON);
        console.log('Parsing data');
        var savedState = JSON.parse(savedStateJSON);
        console.log(savedState);
        this._numberBalls.value = savedState.numberBalls;
        this._sizeBias.value = savedState.sizeBias;
        this._collisionCheck.checked = savedState.collisionCheck;
        this._partitionCheck.checked = savedState.partitionCheck;
        this._partitionType.value = savedState.partitionType;
      }
      console.groupEnd();
    }
  }, {
    key: "initializeSaveStorageCallback",
    value: function initializeSaveStorageCallback() {
      var inputs = [this._numberBalls, this._sizeBias, this._generateButton, this._collisionCheck, this._partitionCheck, this._partitionType];
      for (var _i = 0, _inputs = inputs; _i < _inputs.length; _i++) {
        var inp = _inputs[_i];
        inp.addEventListener('change', this.saveStorage.bind(this));
      }
    }
  }, {
    key: "saveStorage",
    value: function saveStorage() {
      console.groupCollapsed('saveStorage');
      var saveState = {
        numberBalls: this._numberBalls.value,
        sizeBias: this._sizeBias.value,
        collisionCheck: this._collisionCheck.checked,
        partitionCheck: this._partitionCheck.checked,
        partitionType: this._partitionType.value
      };
      console.log('State being saved');
      console.log(saveState);
      console.log('Saving to json');
      var saveStateJSON = JSON.stringify(saveState);
      console.log(saveStateJSON);
      console.log('Setting to stoage key:', Controls.storageKey);
      localStorage.setItem(Controls.storageKey, saveStateJSON);
      console.groupEnd();
    }
  }, {
    key: "showCollisions",
    get: function get() {
      return this._collisionCheck.checked;
    }
  }, {
    key: "showPartitions",
    get: function get() {
      return this._partitionCheck.checked;
    }
  }, {
    key: "partitionType",
    get: function get() {
      return this._partitionType.value;
    }
  }, {
    key: "numberBalls",
    get: function get() {
      return parseInt(this._numberBalls.value);
    }
  }, {
    key: "sizeBias",
    get: function get() {
      return parseFloat(this._sizeBias.value);
    }
  }, {
    key: "frameDelta",
    set: function set(value) {
      this._frameDeltaEntry.innerHTML = "".concat(value, "ms");
    }
  }, {
    key: "framerate",
    set: function set(value) {
      this._framerateEntry.innerHTML = "".concat(value);
    }
  }, {
    key: "cps",
    set: function set(value) {
      this._cpsEntry.innerHTML = "".concat(value);
    }
  }, {
    key: "onGenerate",
    value: function onGenerate(callback) {
      this._generateButton.onclick = callback;
      callback();
    }
  }]);
  return Controls;
}();
_defineProperty(Controls, "storageKey", 'addvscd-setting-state');

/***/ }),

/***/ "./app/geometry.js":
/*!*************************!*\
  !*** ./app/geometry.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ball: () => (/* binding */ Ball)
/* harmony export */ });
/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rect */ "./app/rect.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */


/**
 * Spherical particle
 */
var Ball = /*#__PURE__*/function () {
  /**
   * Construct ball
   * 
   * @param {Vector} pos position of ball
   * @param {Vector} vel velocity of vall
   * @param {float} rad radius of ball
   */
  function Ball(pos, vel) {
    var rad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#ffffff';
    _classCallCheck(this, Ball);
    this.pos = pos;
    this.vel = vel;
    this.rad = rad;
    this.color = color;
  }

  /**
   * Get bounding box
   */
  _createClass(Ball, [{
    key: "boundingBox",
    get: function get() {
      return new _rect__WEBPACK_IMPORTED_MODULE_0__.Rect(this.pos.x - this.rad, this.pos.x + this.rad, this.pos.y - this.rad, this.pos.y + this.rad);
    }

    /**
     * Mass is 1/10 the radius
     */
  }, {
    key: "mass",
    get: function get() {
      return this.rad / 10;
    }

    /**
     * Draw to screen
     * 
     * @param {Screen} screen screen to draw to
     */
  }, {
    key: "draw",
    value: function draw(screen) {
      screen.drawCircle(this.pos, this.rad, this.color);
    }

    /**
     * Update position of ball based on velocity
     */
  }, {
    key: "update",
    value: function update() {
      this.pos = this.pos.add(this.vel);
    }
  }]);
  return Ball;
}();

/***/ }),

/***/ "./app/gizmos.js":
/*!***********************!*\
  !*** ./app/gizmos.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CircleGizmo: () => (/* binding */ CircleGizmo),
/* harmony export */   Gizmo: () => (/* binding */ Gizmo),
/* harmony export */   LineGizmo: () => (/* binding */ LineGizmo),
/* harmony export */   RayGizmo: () => (/* binding */ RayGizmo),
/* harmony export */   RectGizmo: () => (/* binding */ RectGizmo)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
var Gizmo = /*#__PURE__*/function () {
  function Gizmo(expires) {
    _classCallCheck(this, Gizmo);
    this.expires = expires;
  }
  _createClass(Gizmo, [{
    key: "draw",
    value: function draw(screen) {}
  }, {
    key: "stillvalid",
    value: function stillvalid(clock) {
      return clock.time < this.expires;
    }
  }]);
  return Gizmo;
}();
var RayGizmo = /*#__PURE__*/function (_Gizmo) {
  _inherits(RayGizmo, _Gizmo);
  var _super = _createSuper(RayGizmo);
  function RayGizmo(expires, pos, dir, rad) {
    var _this;
    var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'white';
    var linewidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    _classCallCheck(this, RayGizmo);
    _this = _super.call(this, expires);
    _this.position = pos;
    _this.direction = dir;
    _this.radius = rad;
    _this.color = color;
    _this.linewidth = linewidth;
    return _this;
  }
  _createClass(RayGizmo, [{
    key: "draw",
    value: function draw(screen) {
      screen.drawRay(this.position, this.direction.unit, this.radius, this.color, this.linewidth);
    }
  }]);
  return RayGizmo;
}(Gizmo);
var LineGizmo = /*#__PURE__*/function (_Gizmo2) {
  _inherits(LineGizmo, _Gizmo2);
  var _super2 = _createSuper(LineGizmo);
  function LineGizmo(expires, start, end) {
    var _this2;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'white';
    var linewidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    _classCallCheck(this, LineGizmo);
    _this2 = _super2.call(this, expires);
    _this2.start = start;
    _this2.end = end;
    _this2.color = color;
    _this2.linewidth = linewidth;
    return _this2;
  }
  _createClass(LineGizmo, [{
    key: "draw",
    value: function draw(screen) {
      screen.drawLine(this.start, this.end, this.color);
    }
  }]);
  return LineGizmo;
}(Gizmo);
var CircleGizmo = /*#__PURE__*/function (_Gizmo3) {
  _inherits(CircleGizmo, _Gizmo3);
  var _super3 = _createSuper(CircleGizmo);
  function CircleGizmo(expires, pos, radius) {
    var _this3;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'white';
    _classCallCheck(this, CircleGizmo);
    _this3 = _super3.call(this, expires);
    _this3.pos = pos;
    _this3.radius = radius;
    _this3.color = color;
    return _this3;
  }
  _createClass(CircleGizmo, [{
    key: "draw",
    value: function draw(screen) {
      screen.drawCircle(this.pos, this.radius, this.color);
    }
  }]);
  return CircleGizmo;
}(Gizmo);
var RectGizmo = /*#__PURE__*/function (_Gizmo4) {
  _inherits(RectGizmo, _Gizmo4);
  var _super4 = _createSuper(RectGizmo);
  function RectGizmo(expires, rect) {
    var _this4;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'white';
    _classCallCheck(this, RectGizmo);
    _this4 = _super4.call(this, expires);
    _this4.rect = rect;
    _this4.color = color;
    return _this4;
  }
  _createClass(RectGizmo, [{
    key: "draw",
    value: function draw(screen) {
      screen.drawRect(this.rect, this.color);
    }
  }]);
  return RectGizmo;
}(Gizmo);

/***/ }),

/***/ "./app/matrix.js":
/*!***********************!*\
  !*** ./app/matrix.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Matrix)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./app/vector.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */


/**
 * Transformation matrix
 */
var Matrix = /*#__PURE__*/function () {
  /**
   * Construct matrix
   * 
   * @param {float} xx xx component of Matrix 
   * @param {float} xy xy component of Matrix 
   * @param {float} yx yx component of Matrix 
   * @param {float} yy yy component of Matrix 
   */
  function Matrix(xx, xy, yx, yy) {
    _classCallCheck(this, Matrix);
    this.xx = xx;
    this.xy = xy;
    this.yx = yx;
    this.yy = yy;
  }

  /**
   * Add other matrix
   * 
   * @param {Matrix} other other component to add
   * 
   * @returns result of addition
   */
  _createClass(Matrix, [{
    key: "add",
    value: function add(other) {
      return new Matrix(this.xx + other.xx, this.xy + other.xy, this.yx + other.yx, this.yy + other.yy);
    }

    /**
     * Scale by scalar
     * 
     * @param {float} scalar scalar quantity to multiply
     * 
     * @returns result of scale
     */
  }, {
    key: "scale",
    value: function scale(scalar) {
      return new Matrix(this.xx * scalar, this.xy * scalar, this.yx * scalar, this.yy * scalar);
    }

    /**
     * Transform vector
     * 
     * @param {Vector} vect vector to transform
     * 
     * @returns transformed vector
     */
  }, {
    key: "transform",
    value: function transform(vect) {
      return new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.xx * vect.x + this.xy * vect.y, this.yx * vect.x + this.yy * vect.y);
    }
  }]);
  return Matrix;
}();


/***/ }),

/***/ "./app/partitioning.js":
/*!*****************************!*\
  !*** ./app/partitioning.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dynamicPartitioningGrid: () => (/* binding */ dynamicPartitioningGrid),
/* harmony export */   noPartitioning: () => (/* binding */ noPartitioning),
/* harmony export */   staticPartitioningGrid: () => (/* binding */ staticPartitioningGrid)
/* harmony export */ });
/* harmony import */ var _gizmos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gizmos */ "./app/gizmos.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./app/array.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */



/**
 * Do not perform any partitioning and return 
 * all possible unique pairs
 * 
 * @param {Screen} screen screen being mapped over
 * @param {Array} balls balls to find collision checks on
 * @param {int} time current time in ms
 * @param {Array} gizmos gizmos arrays
 * @param {boolean} debug print debug information
 * 
 * @returns collision pairs
 */
function noPartitioning(screen, balls, time, gizmos) {
  var debug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  return (0,_array__WEBPACK_IMPORTED_MODULE_1__.uniquePairs)(balls);
}

/**
 * Generate an static partitioning algorithm which partitions
 * balls based on their loose position in a static grid
 * 
 * @param {int} columns columns in grid
 * @param {int} rows rows in grid
 * 
 * @returns Partition function in grid
 */
function staticPartitioningGrid(rows, columns) {
  /**
   * Partition particles based on their positions in the static grid
   * 
   * @param {Screen} screen screen being mapped over
   * @param {Array} balls balls to find collision checks on
   * @param {int} time current time in ms
   * @param {Array} gizmos gizmos arrays
   * @param {boolean} debug print debug information
   * 
   * @returns collision pairs
   */
  return function staticPartitioning(screen, balls, time, gizmos) {
    var debug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    // Create cells
    var cells = screen.worldRect.partition(columns, rows);
    if (debug) {
      gizmos.push.apply(gizmos, _toConsumableArray(cells.map(function (cell) {
        return new _gizmos__WEBPACK_IMPORTED_MODULE_0__.RectGizmo(time + 10, cell, '#999');
      })));
    }

    // Find partitions
    return cells.flatMap(function (cell) {
      return (0,_array__WEBPACK_IMPORTED_MODULE_1__.uniquePairs)(balls.filter(function (ball) {
        return ball.boundingBox.overlaps(cell);
      }));
    });
  };
}

/**
 * Generate a dynamic partitioning algorithm which partitions
 * balls based on their loose position in a dynamically allocated grid
 * 
 * @param {int} columnFactor column number to subdivide cell by
 * @param {int} rowFactor row number to subdivide cell by
 * @param {int} maxStack maximum stack to recurse into
 * 
 * @returns partition function for dynamic grid
 */
function dynamicPartitioningGrid(columnFactor, rowFactor) {
  var maxStack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  /**
   * Generate a dynamic grid and find collisions
   * 
   * @param {Screen} screen screen being mapped over
   * @param {Array} balls balls to find collision checks on
   * @param {int} time current time in ms
   * @param {Array} gizmos gizmos arrays
   * @param {boolean} debug print debug information
   * 
   * @returns collision pairs
   */
  return function dynamicPartitioning(screen, balls, time, gizmos) {
    var debug = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var recursivePartition = function recursivePartition(balls, root) {
      var colF = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : columnFactor;
      var rowF = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : rowFactor;
      var stack = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : maxStack;
      // Base conditions
      if (balls.length < 2) {
        return [];
      }
      if (balls.length === 2 || stack === 0) {
        return [{
          u: balls
        }];
      }

      // Partition cells
      var cells = root.partition(colF, rowF);
      if (debug) {
        gizmos.push.apply(gizmos, _toConsumableArray(cells.map(function (cell) {
          return new _gizmos__WEBPACK_IMPORTED_MODULE_0__.RectGizmo(time + 10, cell, '#999');
        })));
      }

      // Subdivide partitions
      return cells.flatMap(function (cell) {
        return recursivePartition(balls.filter(function (ball) {
          return ball.boundingBox.overlaps(cell);
        }), cell, rowF, colF, stack - 1);
      });
    };
    return recursivePartition(balls, screen.worldRect).map(function (_ref) {
      var u = _ref.u;
      return u;
    });
  };
}

/***/ }),

/***/ "./app/physics.js":
/*!************************!*\
  !*** ./app/physics.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ballCollision: () => (/* binding */ ballCollision),
/* harmony export */   boundaryCollision: () => (/* binding */ boundaryCollision)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./app/vector.js");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matrix */ "./app/matrix.js");
/* harmony import */ var _gizmos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gizmos */ "./app/gizmos.js");
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */




// Time constants
var SECONDS = 1000;

/**
 * Check boundary collision of ball. Handle intersection
 * correction and velocity reflection
 * 
 * @param {Screen} screen screen to draw debug to
 * @param {Boundary} boundary boundary being checked
 * @param {Ball} ball ball being checked
 * @param {int} time current timestamp
 * @param {boolean} debug true if we're debugging
 * @param {Array} gizmos gizmos array
 * 
 * @returns true if collided
 */
function boundaryCollision(screen, boundary, ball, time, gizmos) {
  var debug = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  // Distance to boundary
  var distance = ball.pos.sub(boundary.pos).dot(boundary.norm);
  if (distance < ball.rad) {
    if (debug) {
      console.group('collision');
      console.log(boundary);
      console.log(ball);
      console.groupEnd();
    }
    var correction = ball.rad - distance;
    ball.pos = ball.pos.add(boundary.norm.scale(correction));

    // Velocity reflection
    var vNormal = boundary.norm.scale(ball.vel.dot(boundary.norm));
    var vParallel = ball.vel.sub(vNormal);
    var vFinal = vParallel.sub(vNormal);

    // Debug collision
    if (debug) {
      // Line radius
      var radius = 20;
      var linewidth = 3;

      // Add gizmos
      gizmos.push(new _gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, ball.pos.sub(boundary.norm.scale(ball.rad)), ball.vel.scale(-1), radius, '#f00', linewidth), new _gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, ball.pos.sub(boundary.norm.scale(ball.rad)), vFinal, radius, '#0f0', linewidth));
    }

    // Update velocity
    ball.vel = vFinal;

    // Ball has collided
    return true;
  } else {
    // Ball has not collided
    return false;
  }
}

/**
 * Check ball collision. Handle intersection correction
 * and momentum transfer
 * 
 * @param {Screen} screen screen to draw debug to
 * @param {Ball} a ball A being checked
 * @param {Ball} b ball B being checked
 * @param {int} time current timestamp
 * @param {Array} gizmos gizmos array
 * @param {boolean} debug true if debugging
 * 
 * @returns true if collided
 */
function ballCollision(screen, a, b, time, gizmos) {
  var debug = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  // Difference vector
  var d = b.pos.sub(a.pos);

  // If distance is greater than both radii
  if (d.magnitude < a.rad + b.rad) {
    // First find the collision normals
    var na = d.unit;
    var nb = na.scale(-1);

    // Correction translation
    var corr = (a.rad + b.rad - d.magnitude) / 2;
    var pa = a.pos.add(nb.scale(corr));
    var pb = b.pos.add(na.scale(corr));

    // Find projections of velocity on normal
    var ua = na.scale(a.vel.dot(na));
    var ub = nb.scale(b.vel.dot(nb));

    // Get other components of velocity on parallel
    var wa = a.vel.sub(ua);
    var wb = b.vel.sub(ub);

    // Momentum exchange using the khan equation
    var ma = a.mass;
    var mb = b.mass;
    var si = new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](ua.magnitude, ub.magnitude);
    var mP = new _matrix__WEBPACK_IMPORTED_MODULE_1__["default"](ma - mb, 2 * mb, 2 * ma, mb - ma).scale(1 / (ma + mb));
    var sf = mP.transform(si);
    var va = na.scale(-sf.x).add(wa);
    var vb = nb.scale(-sf.y).add(wb);

    // Debug collision
    if (debug) {
      // Line radius
      var radius = 20;
      var linewidth = 3;

      // Center 
      var center = a.pos.add(b.pos).scale(0.5);
      var isa = a.vel.magnitude / b.vel.magnitude;
      var fsa = va.magnitude / vb.magnitude;
      var isb = b.vel.magnitude / a.vel.magnitude;
      var fsb = vb.magnitude / va.magnitude;

      // Add gizmos
      gizmos.push(new _gizmos__WEBPACK_IMPORTED_MODULE_2__.LineGizmo(time + 1 * SECONDS, center.sub(wa.unit.scale(radius)), center.add(wa.unit.scale(radius)), '#0af', linewidth), new _gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, center, a.vel.scale(-1), radius * isa, '#f00', linewidth), new _gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, center, va, radius * fsa, '#0f0', linewidth), new _gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, center, b.vel.scale(-1), radius * isb, '#f00', linewidth), new _gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, center, vb, radius * fsb, '#0f0', linewidth));
    }

    // Set velocities
    a.pos = pa;
    a.vel = va;
    b.pos = pb;
    b.vel = vb;

    // Return true because the ball collided
    return true;
  }

  // No ball collision
  return false;
}

/***/ }),

/***/ "./app/rect.js":
/*!*********************!*\
  !*** ./app/rect.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rect: () => (/* binding */ Rect)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./app/vector.js");
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array */ "./app/array.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
var Rect = /*#__PURE__*/function () {
  function Rect(x0, x1, y0, y1) {
    _classCallCheck(this, Rect);
    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
  }
  _createClass(Rect, [{
    key: "overlaps",
    value: function overlaps(rect) {
      return this.x0 < rect.x1 && rect.x0 <= this.x1 && this.y0 < rect.y1 && rect.y0 <= this.y1;
    }
  }, {
    key: "pos0",
    get: function get() {
      return new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.x0, this.y0);
    }
  }, {
    key: "pos1",
    get: function get() {
      return new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.x1, this.y1);
    }
  }, {
    key: "center",
    get: function get() {
      var x0 = this.x0,
        x1 = this.x1,
        y0 = this.y0,
        y1 = this.y1;
      return new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]((x0 + x1) / 2, (y0 + y1) / 2);
    }
  }, {
    key: "partition",
    value: function partition(columns, rows) {
      var columnBreaks = (0,_array__WEBPACK_IMPORTED_MODULE_1__.linearBreaks)(this.x0, this.x1, columns + 1);
      var rowBreaks = (0,_array__WEBPACK_IMPORTED_MODULE_1__.linearBreaks)(this.y0, this.y1, rows + 1);
      return (0,_array__WEBPACK_IMPORTED_MODULE_1__.permutations)((0,_array__WEBPACK_IMPORTED_MODULE_1__.numberRange)(columnBreaks.length - 1), (0,_array__WEBPACK_IMPORTED_MODULE_1__.numberRange)(rowBreaks.length - 1)).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          i = _ref2[0],
          j = _ref2[1];
        return new Rect(columnBreaks[i], columnBreaks[i + 1], rowBreaks[j], rowBreaks[j + 1]);
      });
    }
  }]);
  return Rect;
}();

/***/ }),

/***/ "./app/screen.js":
/*!***********************!*\
  !*** ./app/screen.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Boundary: () => (/* binding */ Boundary),
/* harmony export */   "default": () => (/* binding */ Screen)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./app/vector.js");
/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rect */ "./app/rect.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */



/**
 * Static boundary
 */
var Boundary = /*#__PURE__*/_createClass(
/**
 * Construct boundary
 * 
 * @param {Vector} pos position of boundary
 * @param {Vector} norm boundary normal
 */
function Boundary(pos, norm) {
  _classCallCheck(this, Boundary);
  this.pos = pos;
  this.norm = norm;
});

/**
 * Render to screen
 */
var Screen = /*#__PURE__*/function () {
  function Screen(ctx) {
    _classCallCheck(this, Screen);
    this.ctx = ctx;
  }
  _createClass(Screen, [{
    key: "X",
    get: function get() {
      return this.ctx.canvas.width / 2;
    }
  }, {
    key: "Y",
    get: function get() {
      return this.ctx.canvas.height / 2;
    }
  }, {
    key: "W",
    get: function get() {
      return this.ctx.canvas.width;
    }
  }, {
    key: "H",
    get: function get() {
      return this.ctx.canvas.height;
    }
  }, {
    key: "boundaries",
    get: function get() {
      return [new Boundary(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, this.Y), new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, -1)), new Boundary(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, -this.Y), new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 1)), new Boundary(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.X, 0), new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](-1, 0)), new Boundary(new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](-this.X, 0), new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 0))];
    }
  }, {
    key: "worldRect",
    get: function get() {
      return new _rect__WEBPACK_IMPORTED_MODULE_1__.Rect(-this.X, this.X, -this.Y, this.Y);
    }
  }, {
    key: "centered",
    value: function centered(r) {
      return new _vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.X + r.x, this.Y - r.y);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }, {
    key: "drawLine",
    value: function drawLine(p0, p1, color) {
      var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var t0 = this.centered(p0);
      var t1 = this.centered(p1);
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = width;
      this.ctx.beginPath();
      this.ctx.moveTo(t0.x, t0.y);
      this.ctx.lineTo(t1.x, t1.y);
      this.ctx.stroke();
    }
  }, {
    key: "drawRay",
    value: function drawRay(p, d, l, color) {
      var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var s = p.add(d.scale(l));
      this.drawLine(p, s, color, width);
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(pos, rad) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#000000';
      var trfp = this.centered(pos);
      this.ctx.fillStyle = color;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(trfp.x, trfp.y, rad, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }, {
    key: "drawRect",
    value: function drawRect(rect) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#aaaaaa';
      var c1 = this.centered(rect.pos0);
      var c2 = this.centered(rect.pos1);
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.rect(c1.x, c1.y, c2.x - c1.x, c2.y - c1.y);
      this.ctx.stroke();
    }
  }]);
  return Screen;
}();


/***/ }),

/***/ "./app/vector.js":
/*!***********************!*\
  !*** ./app/vector.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector),
/* harmony export */   random: () => (/* binding */ random),
/* harmony export */   randomWithBias: () => (/* binding */ randomWithBias)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

/**
 * Generate random number between minimum and maximum
 * 
 * @param {float} m minimum
 * @param {float} x maximum
 * 
 * @returns Random number
 */
var random = function random(m, x) {
  return m + Math.random() * (x - m);
};

/**
 * Generate random number biased based on bias value
 * 
 * @param {float} m minimum
 * @param {float} x maximum
 * @param {float} bias bias value (0 to 1)
 * @param {int} roundToNearest if non-negative integer, decimal place to round to
 * 
 * @returns Random biased number
 */
function randomWithBias(m, x) {
  var bias = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var roundToNearest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var k = Math.pow(1 - bias, 3);
  var r = Math.random();
  var g = r * k / (r * k - r + 1);
  var result = m + g * (x - m);
  if (roundToNearest >= 0) {
    var decimal = Math.pow(10, roundToNearest);
    result = Math.round(result * decimal) / decimal;
  }
  return result;
}

/**
 * 2D vector
 */
var Vector = /*#__PURE__*/function () {
  /**
   * Construct vector
   * 
   * @param {float} x x component
   * @param {float} y y component
   */
  function Vector(x, y) {
    _classCallCheck(this, Vector);
    this.x = x;
    this.y = y;
  }

  /**
   * Vector magnitude
   */
  _createClass(Vector, [{
    key: "magnitude",
    get: function get() {
      return Math.sqrt(this.dot(this));
    }

    /**
     * Unit vector
     */
  }, {
    key: "unit",
    get: function get() {
      return this.scale(1 / this.magnitude);
    }

    /**
     * Add other vector
     * 
     * @param {Vector} other other vector to add
     * 
     * @returns result of vector addition
     */
  }, {
    key: "add",
    value: function add(other) {
      return new Vector(this.x + other.x, this.y + other.y);
    }

    /**
     * Multiply vector by scalar
     * 
     * @param {float} scalar scalar value to multiply
     * 
     * @returns result of vector scaling
     */
  }, {
    key: "scale",
    value: function scale(scalar) {
      return new Vector(this.x * scalar, this.y * scalar);
    }

    /**
     * Subtract other vector
     * 
     * @param {Vector} other other vector to subtract
     * 
     * @returns result of vector subtraction
     */
  }, {
    key: "sub",
    value: function sub(other) {
      return other.scale(-1).add(this);
    }

    /**
     * Compute dot product of vectors
     * 
     * @param {Vector} other other vector to in dot product
     * 
     * @returns result of vector dot product
     */
  }, {
    key: "dot",
    value: function dot(other) {
      return this.x * other.x + this.y * other.y;
    }

    /**
     * Convert Vector to string representation
     * 
     * @returns string
     */
  }, {
    key: "toString",
    value: function toString() {
      return "(".concat(this.x.toFixed(1), ", ").concat(this.y.toFixed(1), ")");
    }
  }]);
  return Vector;
}(); // Zero vector

Vector.ZERO = new Vector(0, 0);

/**
 * Vector whose components are random 
 * between respective minima and maxima
 * 
 * @param {float} xm minimum x
 * @param {float} xx maximum x
 * @param {float} ym minimum y
 * @param {float} yx maximum y
 * 
 * @returns Random vector
 */
Vector.random = function (xm, xx, ym, yx) {
  return new Vector(random(xm, xx), random(ym, yx));
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./app/style/main.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./app/style/main.scss ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/**\n * Collision detection\n * \n * Author:  Anshul Kharbanda\n * Created: 4 - 30 - 2021\n */\n* {\n  font-family: 'Segoe UI',  Tahoma, Geneva,  Verdana, sans-serif; }\n\nbody {\n  margin: 0;\n  background-color: #333;\n  color: white; }\n\na {\n  color: #00aaff;\n  text-decoration: none; }\n\na::before {\n  content: '>'; }\n\n#app {\n  text-align: center; }\n\n#canvas {\n  width: 90%;\n  margin: 4pt;\n  border: 1px solid #777;\n  max-width: 1280px; }\n", "",{"version":3,"sources":["webpack://./app/style/main.scss"],"names":[],"mappings":"AAAA;;;;;EAKE;AACF;EACI,8DAEuB,EAAA;;AAG3B;EACI,SAAS;EACT,sBAAsB;EACtB,YAAY,EAAA;;AAGhB;EACI,cAAc;EACd,qBAAqB,EAAA;;AAEzB;EACI,YAAY,EAAA;;AAGhB;EACI,kBAAkB,EAAA;;AAGtB;EACI,UAAU;EACV,WAAW;EACX,sBAAsB;EACtB,iBAAiB,EAAA","sourcesContent":["/**\n * Collision detection\n * \n * Author:  Anshul Kharbanda\n * Created: 4 - 30 - 2021\n */\n* {\n    font-family: 'Segoe UI', \n        Tahoma, Geneva, \n        Verdana, sans-serif;\n}\n\nbody {\n    margin: 0;\n    background-color: #333;\n    color: white;\n}\n\na {\n    color: #00aaff;\n    text-decoration: none;\n}\na::before {\n    content: '>';\n}\n\n#app {\n    text-align: center;\n}\n\n#canvas {\n    width: 90%;\n    margin: 4pt;\n    border: 1px solid #777;\n    max-width: 1280px;\n} "],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./app/style/main.scss":
/*!*****************************!*\
  !*** ./app/style/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./app/style/main.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.scss */ "./app/style/main.scss");
/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./geometry */ "./app/geometry.js");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ "./app/vector.js");
/* harmony import */ var _physics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./physics */ "./app/physics.js");
/* harmony import */ var _partitioning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./partitioning */ "./app/partitioning.js");
/* harmony import */ var _screen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./screen */ "./app/screen.js");
/* harmony import */ var _gizmos__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./gizmos */ "./app/gizmos.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controls */ "./app/controls.js");
/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./clock */ "./app/clock.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */










// Create a screen and controls
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var screen = new _screen__WEBPACK_IMPORTED_MODULE_5__["default"](ctx);
var controls = new _controls__WEBPACK_IMPORTED_MODULE_7__.Controls();
var clock = new _clock__WEBPACK_IMPORTED_MODULE_8__.Clock();

// Initialize game environments
var gizmos = [];
var balls = [];

/**
 * Initialize balls and boundaries
 * 
 * @param {int} number number of balls to generate
 * @param {float} bias (0 to 1) bias towards bigger (0) or smaller (1) balls
 * 
 * @returns balls and boundaries generated
 */
function genearateBalls(number, bias) {
  console.groupCollapsed('genearateBalls');
  var ballColors = ['cyan', 'lime', 'coral', 'yellow', 'violet', 'white'];
  var balls = [];
  for (var i = 0; i < number; i++) {
    var ball = new _geometry__WEBPACK_IMPORTED_MODULE_1__.Ball(_vector__WEBPACK_IMPORTED_MODULE_2__["default"].random(-300, 300, -300, 300), _vector__WEBPACK_IMPORTED_MODULE_2__["default"].random(-5, 5, -5, 5), (0,_vector__WEBPACK_IMPORTED_MODULE_2__.randomWithBias)(5, 30, bias, 0), ballColors[i % ballColors.length]);
    console.log(ball);
    balls.push(ball);
  }
  console.groupEnd();
  return balls;
}
controls.onGenerate(function () {
  var numberOfBalls = parseInt(document.querySelector('#number-balls').value);
  var sizeBias = parseFloat(document.querySelector('#size-bias').value);
  balls = genearateBalls(numberOfBalls, sizeBias);
});

// Buffer to hold current collision checks
var collisions = [];

// Update render time on an interval
setInterval(function () {
  // Update frame stats
  controls.frameDelta = clock.delta;
  controls.framerate = clock.framerate;

  // Update collision stats
  controls.cps = balls.length * screen.boundaries.length + collisions.length;
}, 1000);

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
  // Environment and controls
  clock.tick();
  var DEBUG_COLLISIONS = controls.showCollisions;
  var DEBUG_PARTITIONING = controls.showPartitions;
  var partitionFuncs = {
    'none': _partitioning__WEBPACK_IMPORTED_MODULE_4__.noPartitioning,
    'even-grid-3-5': (0,_partitioning__WEBPACK_IMPORTED_MODULE_4__.staticPartitioningGrid)(3, 5),
    'even-grid-6-10': (0,_partitioning__WEBPACK_IMPORTED_MODULE_4__.staticPartitioningGrid)(6, 10),
    'dynamic-grid-2-2': (0,_partitioning__WEBPACK_IMPORTED_MODULE_4__.dynamicPartitioningGrid)(2, 2),
    'dynamic-grid-3-2': (0,_partitioning__WEBPACK_IMPORTED_MODULE_4__.dynamicPartitioningGrid)(3, 2)
  };
  var partSelection = controls.partitionType;
  var partitionFunc = partitionFuncs[partSelection];

  // Physics update step
  var _iterator = _createForOfIteratorHelper(balls),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ball = _step.value;
      ball.update();
    }

    // Boundary collision detection
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var _iterator2 = _createForOfIteratorHelper(balls),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _ball = _step2.value;
      var _iterator4 = _createForOfIteratorHelper(screen.boundaries),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var boundary = _step4.value;
          (0,_physics__WEBPACK_IMPORTED_MODULE_3__.boundaryCollision)(screen, boundary, _ball, clock.time, gizmos, DEBUG_COLLISIONS);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }

    // Use partition algorithm to get possible collision checks
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  collisions = partitionFunc(screen, balls, clock.time, gizmos, DEBUG_PARTITIONING);

  // Check collisions
  var _iterator3 = _createForOfIteratorHelper(collisions),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _step3$value = _slicedToArray(_step3.value, 2),
        a = _step3$value[0],
        b = _step3$value[1];
      if (DEBUG_PARTITIONING) {
        gizmos.push(new _gizmos__WEBPACK_IMPORTED_MODULE_6__.LineGizmo(clock.time + 10, a.pos, b.pos));
      }
      (0,_physics__WEBPACK_IMPORTED_MODULE_3__.ballCollision)(screen, a, b, clock.time, gizmos, DEBUG_COLLISIONS);
    }

    // Render step
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  screen.clear();
  gizmos = gizmos.filter(function (g) {
    return g.stillvalid(clock);
  });
  gizmos.forEach(function (gizmo) {
    return gizmo.draw(screen);
  });
  balls.forEach(function (ball) {
    return ball.draw(screen);
  });

  // Reloop
  requestAnimationFrame(loop);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map