/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'
import Vector, { random } from './vector'
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
        screen.drawCircle(this.pos, this.rad)
    }

    update() {
        this.pos = this.pos.add(this.vel)
    }
}

function boundaryCollision(screen, ball) {
    let collided = false

    // Reflect againt vertical bounds
    if (Math.abs(ball.pos.y) > screen.canvas.height/2 - ball.rad) {
        ball.vel.y *= -1
        collided ||= true
    }

    // Reflect against horizontal bounds
    if (Math.abs(ball.pos.x) > screen.canvas.width/2 - ball.rad) {
        ball.vel.x *= -1
        collided ||= true
    }

    // Return true if collision
    return collided
}

function ballCollision(screen, a, b) {
    // Difference vector
    let d = b.pos.sub(a.pos)

    // If distance is greater than both radii
    if (d.magnitude() < (a.rad + b.rad)) {
        // First find the collision normals
        let na = d.unit()
        let nb = na.scale(-1)

        // Find projections of velocity on normal
        let ua = na.scale(a.vel.dot(na))
        let ub = nb.scale(b.vel.dot(nb))

        // Get other components of velocity off normal
        let wa = a.vel.sub(ua)
        let wb = b.vel.sub(ub)

        // Momentum exchange
        // Compute total momentum and
        // Split evenly between masses
        let p = a.mass()*ua.magnitude() + b.mass()*ub.magnitude()
        let va = nb.scale(p/2/a.mass()).add(wa)
        let vb = na.scale(p/2/b.mass()).add(wb)

        // Debug draw ray
        if (DEBUG_COLLISIONS) {
            // Collision normal line
            screen.drawLine(a.pos, b.pos, '#000000')

            // Ball A info rays
            screen.drawRay(a.pos, a.vel.unit(), a.rad, '#ff0000') // Velocity
            screen.drawRay(a.pos, wa.unit(), a.rad, '#0000ff') // Reflection line
            screen.drawRay(a.pos, va.unit(), a.rad, '#00ff00', 3) // New Velocity

            // Ball B info rays
            screen.drawRay(b.pos, b.vel.unit(), b.rad, '#ff0000') // Velocity
            screen.drawRay(b.pos, wb.unit(), b.rad, '#0000ff') // Reflection line
            screen.drawRay(b.pos, vb.unit(), b.rad, '#00ff00', 3) // New Velocity
        }

        // Set velocities
        a.vel = va
        b.vel = vb

        // Return true because the ball collided
        return true
    }

    // No ball collision
    return false
}

// Create a screen
const screen = new Screen('canvas')

// Generate a number of balls
let number = 20
let balls = []
while (number > 0) {
    // Create a ball
    let ball = new Ball(
        Vector.random(-200, 200, -200, 200),
        Vector.random(-10, 10, -10, 10),
        random(10, 40)
    )

    // Let's not spawn any balls that are
    // colliding with other balls!
    let collided = false
    for (let other of balls) {
        collided ||= ballCollision(screen, ball, other)
    }
    if (!collided) {
        balls.push(ball)
        --number
    }
}

// Animation step
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

        // Boundary collision detection
        for (let ball of balls) {
            boundaryCollision(screen, ball)
        }

        // Ball pair collision detection
        for (let i = 0; i < balls.length - 1; ++i) {
            for (let j = i + 1; j < balls.length; ++j) {
                let a = balls[i]
                let b = balls[j]
                let collision = ballCollision(screen, a, b)
                if (PAUSE_ON_COLLISION && collision) {
                    wait = 100
                }
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