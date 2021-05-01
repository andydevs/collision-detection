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

// Origin
const O = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

const centered = r => ({ 
    x: r.x + O.x, 
    y: O.y - r.y 
})

const distance = (a, b) => Math.sqrt(
      (b.x - a.x)*(b.x - a.x)
    + (b.y - a.y)*(b.y - a.y)
)

function update(circle) {
    circle.pos.x += circle.vel.x
    circle.pos.y += circle.vel.y
}

function drawCircle(circle) {
    let transformed = centered(circle.pos)
    ctx.strokeStyle = '#000000'
    ctx.beginPath()
    ctx.arc(transformed.x, transformed.y, circle.rad, 0, 2*Math.PI)
    ctx.stroke()
}

const circle0 = { 
    rad: 30,
    pos: { x: -200, y: 0 }, 
    vel: { x: 3, y: 0 } 
}

const circle1 = {
    rad: 30,
    pos: { x: 200, y: 0 }, 
    vel: { x: -2, y: 0.5 }
}

function circleCollisionDetection(circle0, circle1) {
    let d = distance(circle0.pos, circle1.pos)

    // If distance is greater than both radii
    if (d < circle0.rad + circle1.rad) {
        // Draw line between
        let p0 = centered(circle0.pos)
        let p1 = centered(circle1.pos)
        ctx.beginPath()
        ctx.strokeStyle = '#ff0000'
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.stroke()

        // Translate to outside

        // Reflect velocity across
        // collision normal
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
    circleCollisionDetection(circle0, circle1)

    // Next animation frame
    requestAnimationFrame(animate)
}
animate()