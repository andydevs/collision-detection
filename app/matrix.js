/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import Vector from './vector'

export default class Matrix {
    constructor(xx, xy, yx, yy) {
        this.xx = xx
        this.xy = xy
        this.yx = yx
        this.yy = yy
    }

    add(other) {
        return new Matrix(
            this.xx + other.xx,
            this.xy + other.xy,
            this.yx + other.yx,
            this.yy + other.yy,
        )
    }

    scale(scalar) {
        return new Matrix(
            this.xx * scalar,
            this.xy * scalar,
            this.yx * scalar,
            this.yy * scalar
        )
    }

    transform(vect) {
        return new Vector(
            this.xx*vect.x + this.xy*vect.y,
            this.yx*vect.x + this.yy*vect.y
        )
    }
}