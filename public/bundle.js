/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./app/physics.js":
/*!************************!*\
  !*** ./app/physics.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ball: () => (/* binding */ Ball),
/* harmony export */   Boundary: () => (/* binding */ Boundary),
/* harmony export */   ballCollision: () => (/* binding */ ballCollision),
/* harmony export */   boundaryCollision: () => (/* binding */ boundaryCollision)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./app/vector.js");
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matrix */ "./app/matrix.js");
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
    _classCallCheck(this, Ball);
    this.pos = pos;
    this.vel = vel;
    this.rad = rad;
  }

  /**
   * Mass is 1/10 the radius
   */
  _createClass(Ball, [{
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
      screen.drawCircle(this.pos, this.rad, '#00aaff');
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
 * Check boundary collision of ball. Handle intersection
 * correction and velocity reflection
 * 
 * @param {Screen} screen screen to draw debug to
 * @param {Boundary} boundary boundary being checked
 * @param {Ball} ball ball being checked
 * @param {boolean} debug true if we're debugging
 * 
 * @returns true if collided
 */
function boundaryCollision(screen, boundary, ball) {
  var debug = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // Distance to boundary
  var distance = ball.pos.sub(boundary.pos).dot(boundary.norm);
  if (distance < ball.rad) {
    // Boundary intersection correction
    var correction = ball.rad - distance;
    ball.pos = ball.pos.add(boundary.norm.scale(correction));

    // Velocity reflection
    var uVf = boundary.norm.scale(ball.vel.dot(boundary.norm));
    var vVf = ball.vel.sub(uVf);
    var vf = vVf.sub(uVf);
    if (debug) {
      screen.drawRay(ball.pos, ball.vel.unit, ball.rad, '#ff0000'); // Incoming velocity
      screen.drawRay(ball.pos, vVf.unit, ball.rad, '#0000ff'); // Reflection line
      screen.drawRay(ball.pos, vf.unit, ball.rad, '#00ff00', 3); // New Velocity
    }

    // Update velocity
    ball.vel = vf;

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
 * @param {boolean} debug true if debugging
 * 
 * @returns true if collided
 */
function ballCollision(screen, a, b) {
  var debug = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
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

    // Get other components of velocity off normal
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

    // Debug draw ray
    if (debug) {
      // Collision normal line
      screen.drawLine(a.pos, b.pos, '#000000');

      // Ball A info rays
      screen.drawRay(a.pos, a.vel.unit, a.rad, '#ff0000'); // Velocity
      screen.drawRay(a.pos, wa.unit, a.rad, '#0000ff'); // Reflection line
      screen.drawRay(a.pos, va.unit, a.rad, '#00ff00', 3); // New Velocity

      // Ball B info rays
      screen.drawRay(b.pos, b.vel.unit, b.rad, '#ff0000'); // Velocity
      screen.drawRay(b.pos, wb.unit, b.rad, '#0000ff'); // Reflection line
      screen.drawRay(b.pos, vb.unit, b.rad, '#00ff00', 3); // New Velocity
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

/***/ "./app/screen.js":
/*!***********************!*\
  !*** ./app/screen.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Screen)
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
    key: "drawBoundaryBox",
    value: function drawBoundaryBox(pos1, pos2) {
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#aaaaaa';
      var c1 = this.centered(pos1);
      var c2 = this.centered(pos2);
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
 * 
 * @returns Random biased number
 */
function randomWithBias(m, x) {
  var bias = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var k = Math.pow(1 - bias, 3);
  var r = Math.random();
  var g = r * k / (r * k - r + 1);
  return m + g * (x - m);
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
___CSS_LOADER_EXPORT___.push([module.id, "/**\n * Collision detection\n * \n * Author:  Anshul Kharbanda\n * Created: 4 - 30 - 2021\n */\n* {\n  font-family: 'Segoe UI',  Tahoma, Geneva,  Verdana, sans-serif; }\n\nbody {\n  margin: 0;\n  background-color: #333;\n  color: white; }\n\na {\n  color: #00aaff;\n  text-decoration: none; }\n\na::before {\n  content: '>'; }\n\n#app {\n  text-align: center; }\n\n#canvas {\n  width: 100%;\n  max-width: 1280px; }\n", "",{"version":3,"sources":["webpack://./app/style/main.scss"],"names":[],"mappings":"AAAA;;;;;EAKE;AACF;EACI,8DAEuB,EAAA;;AAG3B;EACI,SAAS;EACT,sBAAsB;EACtB,YAAY,EAAA;;AAGhB;EACI,cAAc;EACd,qBAAqB,EAAA;;AAEzB;EACI,YAAY,EAAA;;AAGhB;EACI,kBAAkB,EAAA;;AAGtB;EACI,WAAW;EACX,iBAAiB,EAAA","sourcesContent":["/**\n * Collision detection\n * \n * Author:  Anshul Kharbanda\n * Created: 4 - 30 - 2021\n */\n* {\n    font-family: 'Segoe UI', \n        Tahoma, Geneva, \n        Verdana, sans-serif;\n}\n\nbody {\n    margin: 0;\n    background-color: #333;\n    color: white;\n}\n\na {\n    color: #00aaff;\n    text-decoration: none;\n}\na::before {\n    content: '>';\n}\n\n#app {\n    text-align: center;\n}\n\n#canvas {\n    width: 100%;\n    max-width: 1280px;\n} "],"sourceRoot":""}]);
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
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector */ "./app/vector.js");
/* harmony import */ var _physics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./physics */ "./app/physics.js");
/* harmony import */ var _screen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./screen */ "./app/screen.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */





// Parameters
var DEBUG_BVHEIR = true;
var DEBUG_COLLISIONS = false;
var NUMBER = 5;
var BIAS = 0.45;

// Create a screen
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var screen = new _screen__WEBPACK_IMPORTED_MODULE_3__["default"](ctx);

// Get screen boundaries
var boundaries = [new _physics__WEBPACK_IMPORTED_MODULE_2__.Boundary(new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, screen.Y), new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, -1)), new _physics__WEBPACK_IMPORTED_MODULE_2__.Boundary(new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, -screen.Y), new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, 1)), new _physics__WEBPACK_IMPORTED_MODULE_2__.Boundary(new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](screen.X, 0), new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](-1, 0)), new _physics__WEBPACK_IMPORTED_MODULE_2__.Boundary(new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](-screen.X, 0), new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 0))];

// Generate a bunch of balls
var balls = [];
for (var i = 0; i < NUMBER; i++) {
  balls.push(new _physics__WEBPACK_IMPORTED_MODULE_2__.Ball(_vector__WEBPACK_IMPORTED_MODULE_1__["default"].random(-300, 300, -300, 300), _vector__WEBPACK_IMPORTED_MODULE_1__["default"].random(-5, 5, -5, 5), (0,_vector__WEBPACK_IMPORTED_MODULE_1__.randomWithBias)(5, 50, BIAS)));
}
function boundingVolume(screen, group) {
  var axis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'x';
  var root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var pos0 = new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](screen.X + screen.W / 2, screen.Y + screen.H / 2);
  var pos1 = new _vector__WEBPACK_IMPORTED_MODULE_1__["default"](-screen.X - screen.W / 2, -screen.Y - screen.H / 2);
  var _iterator = _createForOfIteratorHelper(group),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ball = _step.value;
      pos0.x = Math.min(ball.x - ball.rad, pos0.x);
      pos1.x = Math.max(ball.x + ball.rad, pos1.x);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var _iterator2 = _createForOfIteratorHelper(group),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _ball = _step2.value;
      pos0.y = Math.min(_ball.y - _ball.rad, pos0.y);
      pos1.y = Math.max(_ball.y + _ball.rad, pos1.y);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  console.log(pos0, pos1);
  screen.drawBoundaryBox(pos0, pos1);
  if (group.length == 1) return group[0];
  var sortedgroup = group.sort(function (a, b) {
    return a.pos[axis] - b.pos[axis];
  });
  var median = Math.floor(sortedgroup.length / 2);
  var g1 = sortedgroup.slice(0, median);
  var g2 = sortedgroup.slice(median);
  var left, right;
  if (axis === 'x') {
    left = boundingVolume(screen, g1, 'y', false);
    right = boundingVolume(screen, g2, 'y', false);
  } else {
    left = boundingVolume(screen, g1, 'x', false);
    right = boundingVolume(screen, g2, 'x', false);
  }
  return {
    axis: axis,
    left: left,
    right: right
  };
}

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
  // Render step
  screen.clear();
  for (var _i = 0, _balls = balls; _i < _balls.length; _i++) {
    var ball = _balls[_i];
    ball.draw(screen);
  }
  // Update step
  for (var _i2 = 0, _balls2 = balls; _i2 < _balls2.length; _i2++) {
    var _ball2 = _balls2[_i2];
    _ball2.update();
  }

  // Build bounding volume
  var heir = boundingVolume(screen, balls);

  // Collision detection
  for (var _i3 = 0; _i3 < balls.length - 1; ++_i3) {
    // Get ball and reset collision
    var a = balls[_i3];

    // Check with boundary
    for (var _i4 = 0, _boundaries = boundaries; _i4 < _boundaries.length; _i4++) {
      var boundary = _boundaries[_i4];
      (0,_physics__WEBPACK_IMPORTED_MODULE_2__.boundaryCollision)(screen, boundary, a, DEBUG_COLLISIONS);
    }

    // Check with other ball
    for (var j = _i3 + 1; j < balls.length; ++j) {
      var b = balls[j];
      (0,_physics__WEBPACK_IMPORTED_MODULE_2__.ballCollision)(screen, a, b, DEBUG_COLLISIONS);
    }
  }

  // Reloop
  requestAnimationFrame(loop);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map