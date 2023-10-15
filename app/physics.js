/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import Vector from './vector'
import Matrix from './matrix'
import { CollisionGizmo, LineGizmo } from './gizmos'

// Time constants
const SECONDS = 1000

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
    constructor(pos, vel, rad=20, color='#ffffff') {
        this.pos = pos
        this.vel = vel
        this.rad = rad
        this.color = color
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
     * Update position of ball based on velocity
     */
    update() {
        this.pos = this.pos.add(this.vel)
    }
}

/**
 * Static boundary
 */
export class Boundary {
    /**
     * Construct boundary
     * 
     * @param {Vector} pos position of boundary
     * @param {Vector} norm boundary normal
     */
    constructor(pos, norm) {
        this.pos = pos
        this.norm = norm
    }
}

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
export function boundaryCollision(screen, boundary, ball, time, gizmos, debug=false) {
    // Distance to boundary
    let distance = ball.pos.sub(boundary.pos).dot(boundary.norm)
    if (distance < ball.rad) {
        if (debug) {
            console.group('collision')
            console.log(boundary)
            console.log(ball)
            console.groupEnd()
        }
        let correction = ball.rad - distance
        ball.pos = ball.pos.add(boundary.norm.scale(correction))
        
        // Velocity reflection
        let uVf = boundary.norm.scale(ball.vel.dot(boundary.norm))
        let vVf = ball.vel.sub(uVf)
        let vf = vVf.sub(uVf)
        
        // Debug collision
        if (debug) {
            gizmos.push(
                new CollisionGizmo(time + 1*SECONDS, ball.pos, ball.vel, uVf.scale(-1), vf)
            )
        }

        // Update velocity
        ball.vel = vf
        
        // Ball has collided
        return true
    }
    else {
        // Ball has not collided
        return false
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
export function ballCollision(screen, a, b, time, gizmos, debug=false) {
    // Difference vector
    let d = b.pos.sub(a.pos)

    // If distance is greater than both radii
    if (d.magnitude < (a.rad + b.rad)) {
        // First find the collision normals
        let na = d.unit
        let nb = na.scale(-1)

        // Correction translation
        let corr = ((a.rad + b.rad) - d.magnitude)/2
        let pa = a.pos.add(nb.scale(corr))
        let pb = b.pos.add(na.scale(corr))

        // Find projections of velocity on normal
        let ua = na.scale(a.vel.dot(na))
        let ub = nb.scale(b.vel.dot(nb))

        // Get other components of velocity off normal
        let wa = a.vel.sub(ua)
        let wb = b.vel.sub(ub)

        // Momentum exchange using the khan equation
        let ma = a.mass
        let mb = b.mass
        let si = new Vector(
            ua.magnitude,
            ub.magnitude
        )
        let mP = new Matrix(
            (ma - mb), 2*mb,
            2*ma, (mb - ma)
        ).scale(1/(ma + mb))
        let sf = mP.transform(si)
        let va = na.scale(-sf.x).add(wa)
        let vb = nb.scale(-sf.y).add(wb)

        // Debug collision
        if (debug) {
            gizmos.push(
                new LineGizmo(time + 1*SECONDS, a.pos, b.pos),
                new CollisionGizmo(time + 1*SECONDS, a.pos, a.vel, ua.scale(-1), va),
                new CollisionGizmo(time + 1*SECONDS, b.pos, b.vel, ub.scale(-1), vb)
            )
        }

        // Set velocities
        a.pos = pa
        a.vel = va
        b.pos = pb
        b.vel = vb

        // Return true because the ball collided
        return true
    }

    // No ball collision
    return false
}