/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

export const random = (m, x) => m + Math.random()*(x - m)

export default class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    scale(scalar) {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    sub(other) {
        return other.scale(-1).add(this)
    }

    dot(other) {
        return this.x*other.x + this.y*other.y
    }

    magnitude() {
        return Math.sqrt(this.dot(this))
    }

    unit() {
        return this.scale(1/this.magnitude())
    }
}
Vector.ZERO = new Vector(0, 0)
Vector.random = (xm, xx, ym, yx) =>
    new Vector(random(xm, xx), random(ym, yx))