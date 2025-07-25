/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import Vector from './vector'

/**
 * Transformation matrix
 */
export default class Matrix {
    /**
     * Construct matrix
     * 
     * @param {float} xx xx component of Matrix 
     * @param {float} xy xy component of Matrix 
     * @param {float} yx yx component of Matrix 
     * @param {float} yy yy component of Matrix 
     */
    constructor(xx, xy, yx, yy) {
        this.xx = xx
        this.xy = xy
        this.yx = yx
        this.yy = yy
    }

    /**
     * Add other matrix
     * 
     * @param {Matrix} other other component to add
     * 
     * @returns result of addition
     */
    add(other) {
        return new Matrix(
            this.xx + other.xx,
            this.xy + other.xy,
            this.yx + other.yx,
            this.yy + other.yy,
        )
    }

    /**
     * Scale by scalar
     * 
     * @param {float} scalar scalar quantity to multiply
     * 
     * @returns result of scale
     */
    scale(scalar) {
        return new Matrix(
            this.xx * scalar,
            this.xy * scalar,
            this.yx * scalar,
            this.yy * scalar
        )
    }

    /**
     * Transform vector
     * 
     * @param {Vector} vect vector to transform
     * 
     * @returns transformed vector
     */
    transform(vect) {
        return new Vector(
            this.xx*vect.x + this.xy*vect.y,
            this.yx*vect.x + this.yy*vect.y
        )
    }
}