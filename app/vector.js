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
export const random = (m, x) => m + Math.random()*(x - m)

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
export function randomWithBias(m, x, bias=0, roundToNearest=undefined) {
    let k = Math.pow(1 - bias, 3)
    let r = Math.random()
    let g = (r*k)/(r*k - r + 1)
    let result = m + g*(x - m)
    if (roundToNearest >= 0) {
        let decimal = Math.pow(10, roundToNearest)
        result = Math.round(result * decimal) / decimal
    }
    return result
}

/**
 * 2D vector
 */
export default class Vector {
    /**
     * Construct vector
     * 
     * @param {float} x x component
     * @param {float} y y component
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /**
     * Vector magnitude
     */
    get magnitude() {
        return Math.sqrt(this.dot(this))
    }

    /**
     * Unit vector
     */
    get unit() {
        return this.scale(1/this.magnitude)
    }

    /**
     * Add other vector
     * 
     * @param {Vector} other other vector to add
     * 
     * @returns result of vector addition
     */
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    /**
     * Multiply vector by scalar
     * 
     * @param {float} scalar scalar value to multiply
     * 
     * @returns result of vector scaling
     */
    scale(scalar) {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    /**
     * Subtract other vector
     * 
     * @param {Vector} other other vector to subtract
     * 
     * @returns result of vector subtraction
     */
    sub(other) {
        return other.scale(-1).add(this)
    }

    /**
     * Compute dot product of vectors
     * 
     * @param {Vector} other other vector to in dot product
     * 
     * @returns result of vector dot product
     */
    dot(other) {
        return this.x*other.x + this.y*other.y
    }

    /**
     * Convert Vector to string representation
     * 
     * @returns string
     */
    toString() {
        return `(${this.x.toFixed(1)}, ${this.y.toFixed(1)})`
    }
}

// Zero vector
Vector.ZERO = new Vector(0, 0)

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
Vector.random = (xm, xx, ym, yx) => new Vector(random(xm, xx), random(ym, yx))