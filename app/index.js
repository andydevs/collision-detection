/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'
import Vector, { random } from './vector'

const PAUSE_ON_COLLISION = false
const DEBUG_COLLISIONS = false

// Get canvas and drawcontext
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// Origin
const O = new Vector(canvas.width, canvas.height).scale(1/2)
const centered = r => new Vector(O.x + r.x, O.y - r.y)

function drawLine(p0, p1, color, width=1) {
    let t0 = centered(p0)
    let t1 = centered(p1)
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(t0.x, t0.y)
    ctx.lineTo(t1.x, t1.y)
    ctx.stroke()
}

function drawRay(p, d, l, color, width=1) {
    let s = p.add(d.scale(l))
    drawLine(p, s, color, width)
}

function drawCircle(pos, rad, width=1) {
    let transformed = centered(pos)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.arc(transformed.x, transformed.y, rad, 0, 2*Math.PI)
    ctx.stroke()
}

class Ball {
    constructor(pos, vel, rad=20) {
        this.pos = pos
        this.vel = vel
        this.rad = rad
    }

    draw() {
        drawCircle(this.pos, this.rad)
    }

    update() {
        this.pos = this.pos.add(this.vel)
    }
}

function boundaryCollision(ball) {
    let collided = false
    if (Math.abs(ball.pos.y) > canvas.height/2 - ball.rad) {
        ball.vel.y *= -1
        collided ||= true
    }
    if (Math.abs(ball.pos.x) > canvas.width/2 - ball.rad) {
        ball.vel.x *= -1
        collided ||= true
    }
    return collided
}

function ballCollision(a, b) {
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
        let p = ua.magnitude() + ub.magnitude()
        let va = nb.scale(p/2).add(wa)
        let vb = na.scale(p/2).add(wb)

        // Debug draw ray
        if (DEBUG_COLLISIONS) {
            // Collision normal line
            drawLine(a.pos, b.pos, '#000000')

            // Ball A info rays
            drawRay(a.pos, a.vel.unit(), a.rad, '#ff0000') // Velocity
            drawRay(a.pos, wa.unit(), a.rad, '#0000ff') // Reflection line
            drawRay(a.pos, va.unit(), a.rad, '#00ff00', 3) // New Velocity

            // Ball B info rays
            drawRay(b.pos, b.vel.unit(), b.rad, '#ff0000') // Velocity
            drawRay(b.pos, wb.unit(), b.rad, '#0000ff') // Reflection line
            drawRay(b.pos, vb.unit(), b.rad, '#00ff00', 3) // New Velocity
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

// Generate a number of balls
let number = 20
let balls = []
while (number > 0) {
    let ball = new Ball(
        Vector.random(-200, 200, -200, 200),
        Vector.random(-10, 10, -10, 10),
        random(10, 20)
    )

    // Let's not spawn any balls that are
    // colliding with other balls!
    let isFree = true
    for (let other of balls) {
        if (ballCollision(ball, other)) {
            isFree = false
        }
    }
    if (isFree) {
        balls.push(ball)
        --number
    }
}

// Determine pairs of balls
let pairs = []
for (let i = 0; i < balls.length - 1; ++i) {
    for (let j = i + 1; j < balls.length; ++j) {
        pairs.push([ balls[i], balls[j] ])
    }
}
console.log(pairs)

let wait = 0
function animate() {
    if (wait === 0) {
        // Render step
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const ball of balls) {
            ball.draw()
        }

        // Update step
        for (let ball of balls) {
            ball.update()
        }

        // Boundary collision detection
        for (let ball of balls) {
            boundaryCollision(ball)
        }

        // Ball collision detection
        for (let [a, b] of pairs) {
            let collision = ballCollision(a,b)
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