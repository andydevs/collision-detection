/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import Vector from '../math/vector'
import Matrix from '../math/matrix'

/**
 * Check boundary collision of ball. Handle intersection
 * correction and velocity reflection
 * 
 * @param {Boundary} boundary boundary being checked
 * @param {Ball} ball ball being checked
 * 
 * @returns true if collided
 */
export function boundaryCollision(boundary, ball) {
    // Distance to boundary
    let distance = ball.pos.sub(boundary.pos).dot(boundary.norm)

    // Ball has not collided
    if (distance >= ball.rad) { return false }

    // Correction translation
    let correction = ball.rad - distance
    ball.pos = ball.pos.add(boundary.norm.scale(correction))
    
    // Velocity reflection
    let vNormal = boundary.norm.scale(ball.vel.dot(boundary.norm))
    let vParallel = ball.vel.sub(vNormal)
    let vFinal = vParallel.sub(vNormal)

    // Update velocity
    ball.vel = vFinal
    
    // Ball has collided
    return true
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
    if (vectorDifferenceBetweenBalls.magnitude >= (a.rad + b.rad)) { return false }

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

    // Set velocities
    a.pos = aCorrectedPosition
    a.vel = aPostCollisionVelocity
    b.pos = bCorrectedPosition
    b.vel = bPostCollisionVelocity

    // Return true because the ball collided
    return true
}