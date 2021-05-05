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

function boundaryCollision(screen, ball) {
    let collided = false

    // Upper bound
    if (ball.pos.y + ball.rad > screen.canvas.height/2) {
        // Translate down to correct
        let distance = (ball.pos.y + ball.rad) - screen.canvas.height/2
        ball.pos.y -= distance

        // Flip velocity
        ball.vel.y *= -1

        // Update collision
        collided ||= true
    }

    // Lower bound
    if (ball.pos.y - ball.rad < -screen.canvas.height/2) {
        // Translate up to correct
        let distance = (ball.pos.y - ball.rad) + screen.canvas.height/2
        ball.pos.y -= distance

        // Flip velocity
        ball.vel.y *= -1

        // Update collision
        collided ||= true
    }

    // Right bound
    if (ball.pos.x + ball.rad > screen.canvas.width/2) {
        // Translate left to correct
        let distance = (ball.pos.x + ball.rad) - screen.canvas.width/2
        ball.pos.x -= distance

        // Flip velocity
        ball.vel.x *= -1

        // Update collision
        collided ||= true
    }

    // Left bound
    if (ball.pos.x - ball.rad < -screen.canvas.width/2) {
        // Translate right
        let distance = (ball.pos.x - ball.rad) + screen.canvas.width/2
        ball.pos.x -= distance
        
        // Flip velocity
        ball.vel.x *= -1

        // Update collision
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
            screen.drawRay(a.pos, wa.unit(), a.rad, '#0000ff') // Reflection line
            screen.drawRay(a.pos, va.unit(), a.rad, '#00ff00', 3) // New Velocity

            // Ball B info rays
            screen.drawRay(b.pos, b.vel.unit(), b.rad, '#ff0000') // Velocity
            screen.drawRay(b.pos, wb.unit(), b.rad, '#0000ff') // Reflection line
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