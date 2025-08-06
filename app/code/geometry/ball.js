/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import { Rect } from './rect'

/**
 * Spherical particle
 */
export class Ball {
    /**
     * Construct ball
     * 
     * @param {Vector} pos position of ball
     * @param {Vector} vel velocity of vall
     * @param {float} rad radius of ball
     */
    constructor(pos, vel, rad = 20, color = '#ffffff') {
        this.pos = pos
        this.vel = vel
        this.rad = rad
        this.color = color
    }

    /**
     * Get bounding box
     */
    get boundingBox() {
        return new Rect(
            this.pos.x - this.rad,
            this.pos.x + this.rad,
            this.pos.y - this.rad,
            this.pos.y + this.rad
        )
    }

    /**
     * Mass is 1/10 the radius
     */
    get mass() {
        return this.rad / 10
    }

    /**
     * Draw to screen
     * 
     * @param {Screen} screen screen to draw to
     */
    draw(screen) {
        screen.drawCircle(this.pos, this.rad, this.color)
    }

    /**
     * Update position of ball based on velocity and delta
     */
    update(delta) {
        this.pos = this.pos.add(this.vel.scale(delta))
    }
}