/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/code/clock.js":
/*!***************************!*\
  !*** ./app/code/clock.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Clock: () => (/* binding */ Clock)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  return _createClass(Clock, [{
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
}();

/***/ }),

/***/ "./app/code/geometry/ball.js":
/*!***********************************!*\
  !*** ./app/code/geometry/ball.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ball: () => (/* binding */ Ball)
/* harmony export */ });
/* harmony import */ var _rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rect */ "./app/code/geometry/rect.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  return _createClass(Ball, [{
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
}();

/***/ }),

/***/ "./app/code/geometry/rect.js":
/*!***********************************!*\
  !*** ./app/code/geometry/rect.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rect: () => (/* binding */ Rect)
/* harmony export */ });
/* harmony import */ var _math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/vector */ "./app/code/math/vector.js");
/* harmony import */ var _math_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/array */ "./app/code/math/array.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */



/**
 * Generic rectangle
 */
var Rect = /*#__PURE__*/function () {
  function Rect(x0, x1, y0, y1) {
    _classCallCheck(this, Rect);
    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
  }
  return _createClass(Rect, [{
    key: "overlaps",
    value: function overlaps(rect) {
      return this.x0 < rect.x1 && rect.x0 <= this.x1 && this.y0 < rect.y1 && rect.y0 <= this.y1;
    }
  }, {
    key: "pos0",
    get: function get() {
      return new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.x0, this.y0);
    }
  }, {
    key: "pos1",
    get: function get() {
      return new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.x1, this.y1);
    }
  }, {
    key: "center",
    get: function get() {
      var x0 = this.x0,
        x1 = this.x1,
        y0 = this.y0,
        y1 = this.y1;
      return new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"]((x0 + x1) / 2, (y0 + y1) / 2);
    }
  }, {
    key: "partition",
    value: function partition(columns, rows) {
      var columnBreaks = (0,_math_array__WEBPACK_IMPORTED_MODULE_1__.linearBreaks)(this.x0, this.x1, columns + 1);
      var rowBreaks = (0,_math_array__WEBPACK_IMPORTED_MODULE_1__.linearBreaks)(this.y0, this.y1, rows + 1);
      return (0,_math_array__WEBPACK_IMPORTED_MODULE_1__.permutations)((0,_math_array__WEBPACK_IMPORTED_MODULE_1__.numberRange)(columnBreaks.length - 1), (0,_math_array__WEBPACK_IMPORTED_MODULE_1__.numberRange)(rowBreaks.length - 1)).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          i = _ref2[0],
          j = _ref2[1];
        return new Rect(columnBreaks[i], columnBreaks[i + 1], rowBreaks[j], rowBreaks[j + 1]);
      });
    }
  }]);
}();

/***/ }),

/***/ "./app/code/math/array.js":
/*!********************************!*\
  !*** ./app/code/math/array.js ***!
  \********************************/
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

/***/ "./app/code/math/matrix.js":
/*!*********************************!*\
  !*** ./app/code/math/matrix.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Matrix)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./app/code/math/vector.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  return _createClass(Matrix, [{
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
}();


/***/ }),

/***/ "./app/code/math/vector.js":
/*!*********************************!*\
  !*** ./app/code/math/vector.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector),
/* harmony export */   random: () => (/* binding */ random),
/* harmony export */   randomWithBias: () => (/* binding */ randomWithBias)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  return _createClass(Vector, [{
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

/***/ "./app/code/physics/collision.js":
/*!***************************************!*\
  !*** ./app/code/physics/collision.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ballCollision: () => (/* binding */ ballCollision),
/* harmony export */   boundaryCollision: () => (/* binding */ boundaryCollision)
/* harmony export */ });
/* harmony import */ var _math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/vector */ "./app/code/math/vector.js");
/* harmony import */ var _math_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/matrix */ "./app/code/math/matrix.js");
/* harmony import */ var _ui_gizmos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/gizmos */ "./app/code/ui/gizmos.js");
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
      var linewidth = 1;

      // Add gizmos
      gizmos.push(new _ui_gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, ball.pos.sub(boundary.norm.scale(ball.rad)), ball.vel.scale(-1), radius, '#0f0', linewidth), new _ui_gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, ball.pos.sub(boundary.norm.scale(ball.rad)), vFinal, radius, '#0f0', linewidth));
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
  var vectorDifferenceBetweenBalls = b.pos.sub(a.pos);

  // If distance is greater than both radii
  if (vectorDifferenceBetweenBalls.magnitude < a.rad + b.rad) {
    // First find the collision normals
    var collisionNormal = vectorDifferenceBetweenBalls.unit;
    var collisionAntinormal = collisionNormal.scale(-1);

    // Correction translation
    var intersectionCorrectionFactor = (a.rad + b.rad - vectorDifferenceBetweenBalls.magnitude) / 2;
    var aCorrectedPosition = a.pos.add(collisionAntinormal.scale(intersectionCorrectionFactor));
    var bCorrectedPosition = b.pos.add(collisionNormal.scale(intersectionCorrectionFactor));

    // Find projections of velocity on normal
    var aPreCollisionNormalVelocity = collisionNormal.scale(a.vel.dot(collisionNormal));
    var bPreCollisionAntinormalVelocity = collisionAntinormal.scale(b.vel.dot(collisionAntinormal));

    // Get other components of velocity on parallel
    var aParallelVelocity = a.vel.sub(aPreCollisionNormalVelocity);
    var bParallelVelocity = b.vel.sub(bPreCollisionAntinormalVelocity);

    // Momentum exchange using the khan equation
    var preCollisionVelocityState = new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](aPreCollisionNormalVelocity.magnitude, bPreCollisionAntinormalVelocity.magnitude);
    var khanMatrix = new _math_matrix__WEBPACK_IMPORTED_MODULE_1__["default"](a.mass - b.mass, 2 * b.mass, 2 * a.mass, b.mass - a.mass).scale(1 / (a.mass + b.mass));
    var postCollisionVelocityState = khanMatrix.transform(preCollisionVelocityState);
    var aPostCollisionVelocity = collisionNormal.scale(-postCollisionVelocityState.x).add(aParallelVelocity);
    var bPostCollisionVelocity = collisionAntinormal.scale(-postCollisionVelocityState.y).add(bParallelVelocity);

    // Debug collision
    if (debug) {
      // Line radius
      var collisionPlaneLength = 60;
      var radius = 20;
      var linewidth = 1;

      // Collision info 
      var collisionCenter = a.pos.add(b.pos).scale(0.5);
      var collisionParallel = new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](-collisionNormal.y, collisionNormal.x);

      // Add gizmos
      gizmos.push(new _ui_gizmos__WEBPACK_IMPORTED_MODULE_2__.LineGizmo(time + 1 * SECONDS, collisionCenter.sub(collisionParallel.scale(collisionPlaneLength / 2)), collisionCenter.add(collisionParallel.scale(collisionPlaneLength / 2)), '#0af', linewidth), new _ui_gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, collisionCenter, a.vel.scale(-1), radius, '#0f0', linewidth), new _ui_gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, collisionCenter, aPostCollisionVelocity, radius, '#0f0', linewidth), new _ui_gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, collisionCenter, b.vel.scale(-1), radius, '#f00', linewidth), new _ui_gizmos__WEBPACK_IMPORTED_MODULE_2__.RayGizmo(time + 1 * SECONDS, collisionCenter, bPostCollisionVelocity, radius, '#f00', linewidth));
    }

    // Set velocities
    a.pos = aCorrectedPosition;
    a.vel = aPostCollisionVelocity;
    b.pos = bCorrectedPosition;
    b.vel = bPostCollisionVelocity;

    // Return true because the ball collided
    return true;
  }

  // No ball collision
  return false;
}

/***/ }),

/***/ "./app/code/physics/partitioning.js":
/*!******************************************!*\
  !*** ./app/code/physics/partitioning.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dynamicPartitioningGrid: () => (/* binding */ dynamicPartitioningGrid),
/* harmony export */   noPartitioning: () => (/* binding */ noPartitioning),
/* harmony export */   staticPartitioningGrid: () => (/* binding */ staticPartitioningGrid)
/* harmony export */ });
/* harmony import */ var _ui_gizmos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/gizmos */ "./app/code/ui/gizmos.js");
/* harmony import */ var _math_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/array */ "./app/code/math/array.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
  return (0,_math_array__WEBPACK_IMPORTED_MODULE_1__.uniquePairs)(balls);
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
        return new _ui_gizmos__WEBPACK_IMPORTED_MODULE_0__.RectGizmo(time + 10, cell, '#999');
      })));
    }

    // Find partitions
    return cells.flatMap(function (cell) {
      return (0,_math_array__WEBPACK_IMPORTED_MODULE_1__.uniquePairs)(balls.filter(function (ball) {
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
    var _recursivePartition = function recursivePartition(balls, root) {
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
          return new _ui_gizmos__WEBPACK_IMPORTED_MODULE_0__.RectGizmo(time + 10, cell, '#999');
        })));
      }

      // Subdivide partitions
      return cells.flatMap(function (cell) {
        return _recursivePartition(balls.filter(function (ball) {
          return ball.boundingBox.overlaps(cell);
        }), cell, rowF, colF, stack - 1);
      });
    };
    return _recursivePartition(balls, screen.worldRect).map(function (_ref) {
      var u = _ref.u;
      return u;
    });
  };
}

/***/ }),

/***/ "./app/code/ui/controls.js":
/*!*********************************!*\
  !*** ./app/code/ui/controls.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Controls: () => (/* binding */ Controls),
/* harmony export */   PartitionControl: () => (/* binding */ PartitionControl)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

var PartitionControl = /*#__PURE__*/function () {
  function PartitionControl(options) {
    var _this = this;
    _classCallCheck(this, PartitionControl);
    this._selectorElement = document.querySelector('#partition-type');
    this._options = options;
    Object.entries(this._options).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        display = _ref2[1].display;
      var option = document.createElement('option');
      option.setAttribute('value', key);
      option.textContent = display;
      _this._selectorElement.appendChild(option);
    });
  }
  return _createClass(PartitionControl, [{
    key: "value",
    get: function get() {
      return this._selectorElement.value;
    }
  }, {
    key: "func",
    get: function get() {
      return this._options[this.value].func;
    }
  }]);
}();
var Controls = /*#__PURE__*/function () {
  function Controls(partitionControl) {
    _classCallCheck(this, Controls);
    this._numberBalls = document.querySelector('#number-balls');
    this._sizeBias = document.querySelector('#size-bias');
    this._generateButton = document.querySelector('#generate-balls');
    this._collisionCheck = document.querySelector('#show-collision');
    this._partitionCheck = document.querySelector('#show-partitions');
    this._partitionControl = partitionControl;

    // Load from localstorage
    this.loadStorage();
    this.initializeSaveStorageCallback();
  }
  return _createClass(Controls, [{
    key: "loadStorage",
    value: function loadStorage() {
      // Load from localstorage
      console.groupCollapsed('Load config from local storage');
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
        this._partitionControl._selectorElement.value = savedState.partitionType;
      }
      console.groupEnd();
    }
  }, {
    key: "initializeSaveStorageCallback",
    value: function initializeSaveStorageCallback() {
      var inputs = [this._numberBalls, this._sizeBias, this._generateButton, this._collisionCheck, this._partitionCheck, this._partitionControl._selectorElement];
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
        partitionType: this._partitionControl.value
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
      return this._partitionControl.value;
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
    key: "onGenerate",
    value: function onGenerate(callback) {
      this._generateButton.onclick = callback;
      callback();
    }
  }]);
}();
_defineProperty(Controls, "storageKey", 'addvscd-setting-state');

/***/ }),

/***/ "./app/code/ui/gizmos.js":
/*!*******************************!*\
  !*** ./app/code/ui/gizmos.js ***!
  \*******************************/
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
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  return _createClass(Gizmo, [{
    key: "draw",
    value: function draw(screen) {}
  }, {
    key: "stillvalid",
    value: function stillvalid(clock) {
      return clock.time < this.expires;
    }
  }]);
}();
var RayGizmo = /*#__PURE__*/function (_Gizmo) {
  function RayGizmo(expires, pos, dir, rad) {
    var _this;
    var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'white';
    var linewidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    _classCallCheck(this, RayGizmo);
    _this = _callSuper(this, RayGizmo, [expires]);
    _this.position = pos;
    _this.direction = dir;
    _this.radius = rad;
    _this.color = color;
    _this.linewidth = linewidth;
    return _this;
  }
  _inherits(RayGizmo, _Gizmo);
  return _createClass(RayGizmo, [{
    key: "draw",
    value: function draw(screen) {
      screen.drawRay(this.position, this.direction.unit, this.radius, this.color, this.linewidth);
    }
  }]);
}(Gizmo);
var LineGizmo = /*#__PURE__*/function (_Gizmo2) {
  function LineGizmo(expires, start, end) {
    var _this2;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'white';
    var linewidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    _classCallCheck(this, LineGizmo);
    _this2 = _callSuper(this, LineGizmo, [expires]);
    _this2.start = start;
    _this2.end = end;
    _this2.color = color;
    _this2.linewidth = linewidth;
    return _this2;
  }
  _inherits(LineGizmo, _Gizmo2);
  return _createClass(LineGizmo, [{
    key: "draw",
    value: function draw(screen) {
      screen.drawLine(this.start, this.end, this.color);
    }
  }]);
}(Gizmo);
var CircleGizmo = /*#__PURE__*/function (_Gizmo3) {
  function CircleGizmo(expires, pos, radius) {
    var _this3;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'white';
    _classCallCheck(this, CircleGizmo);
    _this3 = _callSuper(this, CircleGizmo, [expires]);
    _this3.pos = pos;
    _this3.radius = radius;
    _this3.color = color;
    return _this3;
  }
  _inherits(CircleGizmo, _Gizmo3);
  return _createClass(CircleGizmo, [{
    key: "draw",
    value: function draw(screen) {
      screen.drawCircle(this.pos, this.radius, this.color);
    }
  }]);
}(Gizmo);
var RectGizmo = /*#__PURE__*/function (_Gizmo4) {
  function RectGizmo(expires, rect) {
    var _this4;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'white';
    _classCallCheck(this, RectGizmo);
    _this4 = _callSuper(this, RectGizmo, [expires]);
    _this4.rect = rect;
    _this4.color = color;
    return _this4;
  }
  _inherits(RectGizmo, _Gizmo4);
  return _createClass(RectGizmo, [{
    key: "draw",
    value: function draw(screen) {
      screen.drawRect(this.rect, this.color);
    }
  }]);
}(Gizmo);

/***/ }),

/***/ "./app/code/ui/screen.js":
/*!*******************************!*\
  !*** ./app/code/ui/screen.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Boundary: () => (/* binding */ Boundary),
/* harmony export */   "default": () => (/* binding */ Screen)
/* harmony export */ });
/* harmony import */ var _math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/vector */ "./app/code/math/vector.js");
/* harmony import */ var _geometry_rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/rect */ "./app/code/geometry/rect.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
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
  return _createClass(Screen, [{
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
      return [new Boundary(new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, this.Y), new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, -1)), new Boundary(new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, -this.Y), new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 1)), new Boundary(new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.X, 0), new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](-1, 0)), new Boundary(new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](-this.X, 0), new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](1, 0))];
    }
  }, {
    key: "worldRect",
    get: function get() {
      return new _geometry_rect__WEBPACK_IMPORTED_MODULE_1__.Rect(-this.X, this.X, -this.Y, this.Y);
    }
  }, {
    key: "centered",
    value: function centered(r) {
      return new _math_vector__WEBPACK_IMPORTED_MODULE_0__["default"](this.X + r.x, this.Y - r.y);
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
}();


/***/ }),

/***/ "./app/code/ui/stats.js":
/*!******************************!*\
  !*** ./app/code/ui/stats.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Stats: () => (/* binding */ Stats)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

var Stats = /*#__PURE__*/function () {
  function Stats() {
    _classCallCheck(this, Stats);
    this._frameDeltaEntry = document.querySelector('#delta');
    this._framerateEntry = document.querySelector('#framerate');
    this._cpsEntry = document.querySelector('#cps');
  }
  return _createClass(Stats, [{
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
  }]);
}();

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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./app/style/main.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_main_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_main_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./app/style/main.scss":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./app/style/main.scss ***!
  \**************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "/**\n * Collision detection\n * \n * Author:  Anshul Kharbanda\n * Created: 4 - 30 - 2021\n */\n* {\n  font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif;\n}\n\nbody {\n  margin: 0;\n  background-color: #333;\n  color: white;\n}\n\na {\n  color: #00aaff;\n  text-decoration: none;\n}\n\na::before {\n  content: \">\";\n}\n\n#app {\n  text-align: center;\n  padding: 4pt;\n}\n\n#grid {\n  display: grid;\n  place-items: center;\n  max-width: 1280px;\n  margin: auto;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(2, auto);\n  grid-template-areas: \"canvas canvas\" \"stats controls\";\n}\n@media screen and (max-width: 450px) {\n  #grid {\n    grid-template-columns: 1fr;\n    grid-template-areas: \"canvas\" \"stats\" \"controls\";\n  }\n}\n\n#canvas {\n  width: 100%;\n  border: 1px solid #777;\n  grid-area: canvas;\n}", "",{"version":3,"sources":["webpack://./app/style/main.scss"],"names":[],"mappings":"AAAA;;;;;EAAA;AAMA;EACI,4DAAA;AACJ;;AAIA;EACI,SAAA;EACA,sBAAA;EACA,YAAA;AADJ;;AAIA;EACI,cAAA;EACA,qBAAA;AADJ;;AAGA;EACI,YAAA;AAAJ;;AAGA;EACI,kBAAA;EACA,YAAA;AAAJ;;AAGA;EACI,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,YAAA;EACA,qCAAA;EACA,mCAAA;EACA,qDACI;AADR;AAGI;EAVJ;IAWQ,0BAAA;IACA,gDACI;EADV;AACF;;AAMA;EACI,WAAA;EACA,sBAAA;EACA,iBAAA;AAHJ","sourceRoot":""}]);
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/main.scss */ "./app/style/main.scss");
/* harmony import */ var _code_geometry_ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./code/geometry/ball */ "./app/code/geometry/ball.js");
/* harmony import */ var _code_math_vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code/math/vector */ "./app/code/math/vector.js");
/* harmony import */ var _code_physics_collision__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./code/physics/collision */ "./app/code/physics/collision.js");
/* harmony import */ var _code_physics_partitioning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./code/physics/partitioning */ "./app/code/physics/partitioning.js");
/* harmony import */ var _code_ui_screen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./code/ui/screen */ "./app/code/ui/screen.js");
/* harmony import */ var _code_ui_gizmos__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./code/ui/gizmos */ "./app/code/ui/gizmos.js");
/* harmony import */ var _code_ui_controls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./code/ui/controls */ "./app/code/ui/controls.js");
/* harmony import */ var _code_ui_stats__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./code/ui/stats */ "./app/code/ui/stats.js");
/* harmony import */ var _code_clock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./code/clock */ "./app/code/clock.js");
/* harmony import */ var _code_math_array__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./code/math/array */ "./app/code/math/array.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */












// Color palette for balls
var ballColors = ['cyan', 'lime', 'coral', 'yellow', 'violet', 'white'];

// Controls for updating simulation
var partitions = new _code_ui_controls__WEBPACK_IMPORTED_MODULE_7__.PartitionControl({
  'none': {
    display: 'No Partitioning',
    func: _code_physics_partitioning__WEBPACK_IMPORTED_MODULE_4__.noPartitioning
  },
  'even-grid-3-5': {
    display: 'Even Grid 3x5',
    func: _code_physics_partitioning__WEBPACK_IMPORTED_MODULE_4__.staticPartitioningGrid(3, 5)
  },
  'even-grid-6-10': {
    display: 'Even Grid 6x10',
    func: _code_physics_partitioning__WEBPACK_IMPORTED_MODULE_4__.staticPartitioningGrid(6, 10)
  },
  'dynamic-grid-2-2': {
    display: 'Dynamic Grid 2x2',
    func: _code_physics_partitioning__WEBPACK_IMPORTED_MODULE_4__.dynamicPartitioningGrid(2, 2)
  },
  'dynamic-grid-3-2': {
    display: 'Dynamic Grid 3x2',
    func: _code_physics_partitioning__WEBPACK_IMPORTED_MODULE_4__.dynamicPartitioningGrid(3, 2)
  }
});
var controls = new _code_ui_controls__WEBPACK_IMPORTED_MODULE_7__.Controls(partitions);

// Simulation stats
var stats = new _code_ui_stats__WEBPACK_IMPORTED_MODULE_8__.Stats();

// Simulation screen
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var screen = new _code_ui_screen__WEBPACK_IMPORTED_MODULE_5__["default"](ctx);
var clock = new _code_clock__WEBPACK_IMPORTED_MODULE_9__.Clock();

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
  var balls = Array.from({
    length: number
  }, function (_, i) {
    var ball = new _code_geometry_ball__WEBPACK_IMPORTED_MODULE_1__.Ball(_code_math_vector__WEBPACK_IMPORTED_MODULE_2__["default"].random(-300, 300, -300, 300), _code_math_vector__WEBPACK_IMPORTED_MODULE_2__["default"].random(-5, 5, -5, 5), (0,_code_math_vector__WEBPACK_IMPORTED_MODULE_2__.randomWithBias)(5, 30, bias, 0), ballColors[i % ballColors.length]);
    console.log(ball);
    return ball;
  });
  console.groupEnd();
  return balls;
}

// Initialize game environment stuff
var gizmos = [];
var balls = [];
controls.onGenerate(function () {
  balls = genearateBalls(controls.numberBalls, controls.sizeBias);
});

// Buffer to hold current collision checks
var nChecks = 0;

// Update render time on an interval
setInterval(function () {
  // Update frame stats
  stats.frameDelta = clock.delta;
  stats.framerate = clock.framerate;

  // Update collision stats
  stats.cps = balls.length * screen.boundaries.length + nChecks;
}, 1000);

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
  // Environment and controls
  clock.tick();

  // Physics update step
  balls.forEach(function (ball) {
    return ball.update();
  });

  // Boundary collision detection
  (0,_code_math_array__WEBPACK_IMPORTED_MODULE_10__.permutations)(balls, screen.boundaries).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      ball = _ref2[0],
      boundary = _ref2[1];
    (0,_code_physics_collision__WEBPACK_IMPORTED_MODULE_3__.boundaryCollision)(screen, boundary, ball, clock.time, gizmos, controls.showCollisions);
  });

  // Use partition algorithm to get possible collision checks
  var collisions = partitions.func(screen, balls, clock.time, gizmos, controls.showPartitions);
  nChecks = collisions.length;

  // Check collisions
  collisions.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      a = _ref4[0],
      b = _ref4[1];
    if (controls.showPartitions) {
      gizmos.push(new _code_ui_gizmos__WEBPACK_IMPORTED_MODULE_6__.LineGizmo(clock.time + 10, a.pos, b.pos));
    }
    (0,_code_physics_collision__WEBPACK_IMPORTED_MODULE_3__.ballCollision)(screen, a, b, clock.time, gizmos, controls.showCollisions);
  });

  // Render step
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