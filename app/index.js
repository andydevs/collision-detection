/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'

class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    scale(scalar) {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    sub(other) {
        return other.scale(-1).add(this)
    }

    dot(other) {
        return this.x*other.x + this.y*other.y
    }

    magnitude() {
        return Math.sqrt(this.dot(this))
    }

    unit() {
        return this.scale(1/this.magnitude())
    }
}
Vector.ZERO = new Vector(0, 0)

const random = (m, x) => m + Math.random()*(x - m)
const randomVector = (xm, xx, ym, yx) =>
    new Vector(random(xm, xx), random(ym, yx))


// Get canvas and drawcontext
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// Origin
const O = new Vector(canvas.width, canvas.height).scale(1/2)
const centered = r => new Vector(O.x + r.x, O.y - r.y)

function drawLine(p0, p1, color) {
    let t0 = centered(p0)
    let t1 = centered(p1)
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(t0.x, t0.y)
    ctx.lineTo(t1.x, t1.y)
    ctx.stroke()
}

function drawRay(p, d, l, color) {
    let s = p.add(d.scale(l))
    drawLine(p, s, color)
}

function drawCircle(pos, rad) {
    let transformed = centered(pos)
    ctx.strokeStyle = '#000000'
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
    if (Math.abs(ball.pos.y) > canvas.height/2 - ball.rad) { ball.vel.y *= -1 }
    if (Math.abs(ball.pos.x) > canvas.width/2 - ball.rad) { ball.vel.x *= -1 }
}

function ballCollision(a, b) {
    // Difference vector
    let d = b.pos.sub(a.pos)

    // If distance is greater than both radii
    if (d.magnitude() < a.rad + b.rad) {
        // First find the collision normal
        let n = d.unit()

        // Find component of velocity parallel to normal (u)
        // and component of velocity perpendicular to normal (v)
        let u = n.scale(a.vel.dot(n))
        let v = a.vel.add(u.scale(-1))

        // New velocity is the negative parallel + perpendicular
        a.vel = u.scale(-1).add(v)
    }
}

let balls = []
for (let index = 0; index < 6; index++) {
    balls.push(
        new Ball(
            randomVector(-200, 200, -200, 200),
            randomVector(-5, 5, -5, 5)
        )
    )
}

function animate() {
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

    // Circle collision detection
    for (let i in balls) {
        let tball = balls[i]
        for (let j in balls) {
            if (i !== j) {
                let sball = balls[j]
                ballCollision(tball, sball)
            }
        }
    }

    // Next animation frame
    requestAnimationFrame(animate)
}
animate()