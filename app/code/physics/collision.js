/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import Vector from '../math/vector'
import Matrix from '../math/matrix'
import { LineGizmo, RayGizmo } from '../ui/gizmos'

// Time constants
const SECONDS = 1000

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
        let vNormal = boundary.norm.scale(ball.vel.dot(boundary.norm))
        let vParallel = ball.vel.sub(vNormal)
        let vFinal = vParallel.sub(vNormal)
        
        // Debug collision
        if (debug) {
            // Line radius
            let radius = 20
            let linewidth = 1

            // Add gizmos
            gizmos.push(
                new RayGizmo(time + 1*SECONDS,
                    ball.pos.sub(boundary.norm.scale(ball.rad)), 
                    ball.vel.scale(-1), radius,
                    '#0f0', linewidth
                ),
                new RayGizmo(time + 1*SECONDS,
                    ball.pos.sub(boundary.norm.scale(ball.rad)), 
                    vFinal, radius,
                    '#0f0', linewidth
                )
            )
        }

        // Update velocity
        ball.vel = vFinal
        
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

        // Get other components of velocity on parallel
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
            // Line radius
            let collisionPlaneLength = 60
            let radius = 20
            let linewidth = 1

            // Center 
            let center = a.pos.add(b.pos).scale(0.5)

            // Add gizmos
            gizmos.push(
                new LineGizmo(time + 1*SECONDS,
                    center.sub(wa.unit.scale(collisionPlaneLength/2)),
                    center.add(wa.unit.scale(collisionPlaneLength/2)),
                    '#0af', linewidth
                ),
                new RayGizmo(time + 1*SECONDS,
                    center, a.vel.scale(-1), radius,
                    '#0f0', linewidth
                ),
                new RayGizmo(time + 1*SECONDS,
                    center, va, radius,
                    '#0f0', linewidth
                ),
                new RayGizmo(time + 1*SECONDS,
                    center, b.vel.scale(-1), radius,
                    '#f00', linewidth
                ),
                new RayGizmo(time + 1*SECONDS,
                    center, vb, radius,
                    '#f00', linewidth
                ),
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