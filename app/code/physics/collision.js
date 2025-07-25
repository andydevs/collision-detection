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
    let vectorDifferenceBetweenBalls = b.pos.sub(a.pos)

    // If distance is greater than both radii
    if (vectorDifferenceBetweenBalls.magnitude < (a.rad + b.rad)) {
        // First find the collision normals
        let collisionNormal = vectorDifferenceBetweenBalls.unit
        let collisionAntinormal = collisionNormal.scale(-1)

        // Correction translation
        let intersectionCorrectionFactor = ((a.rad + b.rad) - vectorDifferenceBetweenBalls.magnitude)/2
        let aCorrectedPosition = a.pos
            .add(collisionAntinormal.scale(intersectionCorrectionFactor))
        let bCorrectedPosition = b.pos
            .add(collisionNormal.scale(intersectionCorrectionFactor))

        // Find projections of velocity on normal
        let aPreCollisionNormalVelocity = collisionNormal
            .scale(a.vel.dot(collisionNormal))
        let bPreCollisionAntinormalVelocity = collisionAntinormal
            .scale(b.vel.dot(collisionAntinormal))

        // Get other components of velocity on parallel
        let aParallelVelocity = a.vel.sub(aPreCollisionNormalVelocity)
        let bParallelVelocity = b.vel.sub(bPreCollisionAntinormalVelocity)

        // Momentum exchange using the khan equation
        let preCollisionVelocityState = new Vector(
            aPreCollisionNormalVelocity.magnitude,
            bPreCollisionAntinormalVelocity.magnitude
        )
        let khanMatrix = new Matrix(
            (a.mass - b.mass), 2*b.mass,
            2*a.mass, (b.mass - a.mass)
        ).scale(1/(a.mass + b.mass))
        let postCollisionVelocityState = khanMatrix
            .transform(preCollisionVelocityState)
        let aPostCollisionVelocity = collisionNormal
            .scale(-postCollisionVelocityState.x)
            .add(aParallelVelocity)
        let bPostCollisionVelocity = collisionAntinormal
            .scale(-postCollisionVelocityState.y)
            .add(bParallelVelocity)

        // Debug collision
        if (debug) {
            // Line radius
            let collisionPlaneLength = 60
            let radius = 20
            let linewidth = 1

            // Collision info 
            let collisionCenter = a.pos.add(b.pos).scale(0.5)
            let collisionParallel = new Vector(-collisionNormal.y, collisionNormal.x)

            // Add gizmos
            gizmos.push(
                new LineGizmo(time + 1*SECONDS,
                    collisionCenter.sub(collisionParallel.scale(collisionPlaneLength/2)),
                    collisionCenter.add(collisionParallel.scale(collisionPlaneLength/2)),
                    '#0af', linewidth
                ),
                new RayGizmo(time + 1*SECONDS,
                    collisionCenter, a.vel.scale(-1), radius,
                    '#0f0', linewidth
                ),
                new RayGizmo(time + 1*SECONDS,
                    collisionCenter, aPostCollisionVelocity, radius,
                    '#0f0', linewidth
                ),
                new RayGizmo(time + 1*SECONDS,
                    collisionCenter, b.vel.scale(-1), radius,
                    '#f00', linewidth
                ),
                new RayGizmo(time + 1*SECONDS,
                    collisionCenter, bPostCollisionVelocity, radius,
                    '#f00', linewidth
                ),
            )
        }

        // Set velocities
        a.pos = aCorrectedPosition
        a.vel = aPostCollisionVelocity
        b.pos = bCorrectedPosition
        b.vel = bPostCollisionVelocity

        // Return true because the ball collided
        return true
    }

    // No ball collision
    return false
}