/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'

// Get canvas and drawcontext
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

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

// Origin
const O = new Vector(canvas.width, canvas.height).scale(1/2)
const centered = r => new Vector(O.x + r.x, O.y - r.y)
const diff = (a, b) => a.scale(-1).add(b)

function update(circle) {
    circle.pos.x += circle.vel.x
    circle.pos.y += circle.vel.y
}

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

function drawCircle(circle) {
    let transformed = centered(circle.pos)
    ctx.strokeStyle = '#000000'
    ctx.beginPath()
    ctx.arc(transformed.x, transformed.y, circle.rad, 0, 2*Math.PI)
    ctx.stroke()
}

function circleCollision(circle0, circle1) {
    // Difference vector
    let d = diff(circle0.pos, circle1.pos)

    // If distance is greater than both radii
    if (d.magnitude() < circle0.rad + circle1.rad) {
        // First find the collision normal
        let n = d.unit()
        drawRay(circle0.pos, n, 0.60*circle0.rad, '#0000ff')

        // Next find component of velocity parallel to normal (u)
        // and component of velocity perpendicular to normal (v)
        let r = circle0.vel.dot(n) / n.magnitude()
        let u = n.unit().scale(r)
        let v = circle0.vel.add(u.scale(-1))
        drawRay(circle0.pos, u.unit(), 0.40*circle0.rad, '#00ff00')
        drawRay(circle0.pos, v.unit(), 0.40*circle0.rad, '#ff0000')

        // New velocity is the negative parallel + perpendicular
        circle0.vel = u.scale(-1).add(v)
    }

}

function boundaryCollision(circle) {
    // Check vertical bounds
    if (Math.abs(circle.pos.y) > canvas.height/2 - circle.rad) {
        circle.vel.y *= -1
    }

    // Check horizontal bounds
    if (Math.abs(circle.pos.x) > canvas.width / 2 - circle.rad) {
        circle.vel.x *= -1
    }
}

const circle0 = { 
    rad: 20,
    pos: new Vector(-200, 0), 
    vel: new Vector(3, 0)
}

const circle1 = {
    rad: 20,
    pos: new Vector(200, 0), 
    vel: new Vector(-2, 0.5)
}

function animate() {
    // Render step
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCircle(circle0)
    drawCircle(circle1)

    // Update step
    update(circle0)
    update(circle1)

    // Collision detection
    boundaryCollision(circle0)
    boundaryCollision(circle1)
    circleCollision(circle0, circle1)
    circleCollision(circle1, circle0)

    // Next animation frame
    requestAnimationFrame(animate)
}
animate()