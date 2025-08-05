/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import Vector from '../math/vector'
import Matrix from '../math/matrix'
import { Expirable } from '../ui/screen';

/**
 * Create expirable for drawing set of collisions for this frame
 * 
 * @param {CollisionExprableParams} params parameters for collision expirable
 * 
 * @returns {Expirable} collision expirable
 */
export function createCollisionExpirable(params) {
    let drawOutgoing = (screen, c, d, q) => {
        screen.drawRay(c, d, params.style.length, params.style.color[q], params.style.lineWidth)
    }
    let drawIncoming = (screen, c, d, q) => {
        screen.drawRay(c, d, -params.style.length, params.style.color[q], params.style.lineWidth)
    }
    let drawParallel = (screen, c, p) => {
        screen.drawRay(c, p, -params.style.length, params.style.color.parallel, params.style.lineWidth)
        screen.drawRay(c, p, params.style.length, params.style.color.parallel, params.style.lineWidth)
    }
    let drawCollision = (screen, col) => {
        drawIncoming(screen, col.center, col.a.initial, 'a')
        drawOutgoing(screen, col.center, col.a.final, 'a')
        if (col.hasOwnProperty('b')) {
            drawIncoming(screen, col.center, col.b.initial, 'b')
            drawOutgoing(screen, col.center, col.b.final, 'b')
        }
        if (col.hasOwnProperty('parallel')) {
            drawParallel(screen, col.center, col.parallel)
        }
    }
    return new Expirable({
        frames: params.frames,
        drawFunc: (screen) => params.collisions
            .forEach(col => drawCollision(screen, col))
    })
}

/**
 * Check boundary collision of ball. Handle intersection
 * correction and velocity reflection
 * 
 * @param {Boundary} boundary boundary being checked
 * @param {Ball} ball ball being checked
 * 
 * @returns Collision information or null
 */
export function boundaryCollision(boundary, ball) {
    // Distance to boundary
    let distance = ball.pos.sub(boundary.pos).dot(boundary.norm)

    // Ball has not collided
    if (distance >= ball.rad) { return null }

    // Correction translation
    let correction = ball.rad - distance
    ball.pos = ball.pos.add(boundary.norm.scale(correction))
    
    // Velocity reflection
    let vInitial = ball.vel
    let vNormal = boundary.norm.scale(vInitial.dot(boundary.norm))
    let vParallel = ball.vel.sub(vNormal)
    let vFinal = vParallel.sub(vNormal)

    // Update velocity
    ball.vel = vFinal

    // Return collision information
    return {
        center: ball.pos.sub(boundary.norm.scale(distance)),
        a: {
            initial: vInitial.unit,
            final: vFinal.unit
        }
    }
}

/**
 * Check ball collision. Handle intersection correction
 * and momentum transfer
 * 
 * @param {Ball} a ball A being checked
 * @param {Ball} b ball B being checked
 * 
 * @returns true if collided
 */
export function ballCollision(a, b) {
    // Difference vector
    let vectorDifferenceBetweenBalls = b.pos.sub(a.pos)

    // Return false if the distance is greater than the radii
    if (vectorDifferenceBetweenBalls.magnitude >= (a.rad + b.rad)) { return null }

    // First find the collision normals
    let collisionNormal = vectorDifferenceBetweenBalls.unit
    let collisionAntinormal = collisionNormal.scale(-1)
    let collisionParallel = new Vector(-collisionNormal.y, collisionNormal.x)

    // Correction translation
    let intersectionCorrectionFactor = ((a.rad + b.rad) - vectorDifferenceBetweenBalls.magnitude)/2
    let aCorrectedPosition = a.pos
        .add(collisionAntinormal.scale(intersectionCorrectionFactor))
    let bCorrectedPosition = b.pos
        .add(collisionNormal.scale(intersectionCorrectionFactor))

    // Initial velocity
    let aPreCollisionVelocity = a.vel
    let bPreCollisionVelocity = b.vel

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

    // Set velocities
    a.pos = aCorrectedPosition
    a.vel = aPostCollisionVelocity
    b.pos = bCorrectedPosition
    b.vel = bPostCollisionVelocity

    // Return true because the ball collided
    return {
        center: a.pos.scale(a.rad).add(b.pos.scale(b.rad)).scale(1/(a.rad + b.rad)),
        parallel: collisionParallel,
        a: {
            initial: aPreCollisionVelocity.unit,
            final: aPostCollisionVelocity.unit
        },
        b: {
            initial: bPreCollisionVelocity.unit,
            final: bPostCollisionVelocity.unit
        }
    }
}