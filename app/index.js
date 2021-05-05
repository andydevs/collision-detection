/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'
import Vector, { randomWithBias } from './vector'
import Matrix from './matrix'
import Screen from './screen'

// Parameters
let PAUSE_ON_COLLISION = false
let DEBUG_COLLISIONS = false

class Ball {
    constructor(pos, vel, rad=20) {
        this.pos = pos
        this.vel = vel
        this.rad = rad
    }

    // Mass is 1/10 the radius
    mass() {
        return this.rad / 10
    }

    draw(screen) {
        screen.drawCircle(this.pos, this.rad, '#00aaff')
    }

    update() {
        this.pos = this.pos.add(this.vel)
    }
}

class Boundary {
    constructor(pos, norm) {
        this.pos = pos
        this.norm = norm
    }
}

function boundaryCollision(screen, boundary, ball) {
    // Distance to boundary
    let distance = ball.pos.sub(boundary.pos).dot(boundary.norm)
    if (distance < ball.rad) {
        // Boundary intersection correction
        let correction = ball.rad - distance
        ball.pos = ball.pos.add(boundary.norm.scale(correction))
        
        // Velocity reflection
        let uVf = boundary.norm.scale(ball.vel.dot(boundary.norm))
        let vVf = ball.vel.sub(uVf)
        let vf = vVf.sub(uVf)
        
        if (DEBUG_COLLISIONS) {
            screen.drawRay(ball.pos, ball.vel.unit(), ball.rad, '#ff0000') // Incoming velocity
            screen.drawRay(ball.pos, vVf.unit(), ball.rad, '#0000ff')      // Reflection line
            screen.drawRay(ball.pos, vf.unit(), ball.rad, '#00ff00', 3)    // New Velocity
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

function ballCollision(screen, a, b) {
    // Difference vector
    let d = b.pos.sub(a.pos)

    // If distance is greater than both radii
    if (d.magnitude() < (a.rad + b.rad)) {
        // First find the collision normals
        let na = d.unit()
        let nb = na.scale(-1)

        // Correction translation
        let corr = (a.rad + b.rad) - d.magnitude()
        let pa = a.pos.add(nb.scale(corr/2))
        let pb = b.pos.add(na.scale(corr/2))

        // Find projections of velocity on normal
        let ua = na.scale(a.vel.dot(na))
        let ub = nb.scale(b.vel.dot(nb))

        // Get other components of velocity off normal
        let wa = a.vel.sub(ua)
        let wb = b.vel.sub(ub)

        // Momentum exchange using the khan equation
        let ma = a.mass()
        let mb = b.mass()
        let si = new Vector(
            ua.magnitude(),
            ub.magnitude()
        )
        let mP = new Matrix(
            (ma - mb), 2*mb,
            2*ma, (mb - ma)
        ).scale(1/(ma + mb))
        let sf = mP.transform(si)
        let va = nb.scale(sf.x).add(wa)
        let vb = na.scale(sf.y).add(wb)

        // Debug draw ray
        if (DEBUG_COLLISIONS) {
            // Collision normal line
            screen.drawLine(a.pos, b.pos, '#000000')

            // Ball A info rays
            screen.drawRay(a.pos, a.vel.unit(), a.rad, '#ff0000') // Velocity
            screen.drawRay(a.pos, wa.unit(), a.rad, '#0000ff')    // Reflection line
            screen.drawRay(a.pos, va.unit(), a.rad, '#00ff00', 3) // New Velocity

            // Ball B info rays
            screen.drawRay(b.pos, b.vel.unit(), b.rad, '#ff0000') // Velocity
            screen.drawRay(b.pos, wb.unit(), b.rad, '#0000ff')    // Reflection line
            screen.drawRay(b.pos, vb.unit(), b.rad, '#00ff00', 3) // New Velocity
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

// Create a screen
const screen = new Screen('canvas')

// Get screen boundaries
let boundaries = [
    new Boundary(new Vector(0, screen.Y), new Vector(0, -1)),
    new Boundary(new Vector(0, -screen.Y), new Vector(0, 1)),
    new Boundary(new Vector(screen.X, 0), new Vector(-1, 0)),
    new Boundary(new Vector(-screen.X, 0), new Vector(1, 0))
]

// Generate a bunch of balls
const number = 40
let balls = []
for (let i = 0; i < number; i++) {
    balls.push(
        new Ball(
            Vector.random(-300, 300, -300, 300),
            Vector.random(-5, 5, -5, 5),
            randomWithBias(10, 50, 0.6)
        )
    )
}

// Animation step
let collision
let wait = 0
function animate() {
    if (wait === 0) {
        // Render step
        screen.clear()
        for (const ball of balls) {
            ball.draw(screen)
        }

        // Update step
        for (let ball of balls) {
            ball.update()
        }

        // Collision detection
        for (let i = 0; i < balls.length - 1; ++i) {
            // Get ball and reset collision
            let a = balls[i]
            collision = false
            
            // Check with boundary
            for (let boundary of boundaries) {
                collision ||= boundaryCollision(screen, boundary, a)
            }

            // Check with other ball
            for (let j = i + 1; j < balls.length; ++j) {
                let b = balls[j]
                collision ||= ballCollision(screen, a, b)
            }

            // Wait if we've collided and we're pausing on each collision
            if (PAUSE_ON_COLLISION && collision) {
                wait = 100
            }
        }
    }
    else {
        --wait
    }

    // Next animation frame
    requestAnimationFrame(animate)
}
animate()