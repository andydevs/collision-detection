/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'
import Vector, { randomWithBias } from './vector'
import { Ball, Boundary, boundaryCollision, ballCollision } from "./physics";
import Screen from './screen'

// Parameters
let DEBUG_BVHEIR = true
let DEBUG_COLLISIONS = false
let NUMBER = 5
let BIAS = 0.45

// Create a screen
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let screen = new Screen(ctx)

// Get screen boundaries
let boundaries = [
    new Boundary(new Vector(0, screen.Y), new Vector(0, -1)),
    new Boundary(new Vector(0, -screen.Y), new Vector(0, 1)),
    new Boundary(new Vector(screen.X, 0), new Vector(-1, 0)),
    new Boundary(new Vector(-screen.X, 0), new Vector(1, 0))
]

// Generate a bunch of balls
let balls = []
for (let i = 0; i < NUMBER; i++) {
    balls.push(
        new Ball(
            Vector.random(-300, 300, -300, 300),
            Vector.random(-5, 5, -5, 5),
            randomWithBias(5, 50, BIAS)
        )
    )
}

function boundingVolume(screen, group, axis='x', root=true) {
    let pos0 = new Vector(screen.X + screen.W/2, screen.Y + screen.H/2)
    let pos1 = new Vector(- screen.X - screen.W/2, - screen.Y - screen.H/2)

    for (const ball of group) {
        pos0.x = Math.min(ball.x - ball.rad, pos0.x)
        pos1.x = Math.max(ball.x + ball.rad, pos1.x)
    }
    for (const ball of group) {
        pos0.y = Math.min(ball.y - ball.rad, pos0.y)
        pos1.y = Math.max(ball.y + ball.rad, pos1.y)
    }

    console.log(pos0, pos1)
    screen.drawBoundaryBox(pos0, pos1)

    if (group.length == 1) return group[0]
    let sortedgroup = group.sort((a, b) => a.pos[axis] - b.pos[axis])
    let median = Math.floor(sortedgroup.length / 2)
    let g1 = sortedgroup.slice(0, median)
    let g2 = sortedgroup.slice(median)
    let left, right;
    if (axis === 'x') {
        left = boundingVolume(screen, g1, 'y', false)
        right = boundingVolume(screen, g2, 'y', false)
    }
    else {
        left = boundingVolume(screen, g1, 'x', false)
        right = boundingVolume(screen, g2, 'x', false)
    }
    return { axis, left, right }
}

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
    // Render step
    screen.clear()
    for (const ball of balls) { ball.draw(screen) }
    // Update step
    for (let ball of balls) { ball.update() }
    
    // Build bounding volume
    let heir = boundingVolume(screen, balls)

    // Collision detection
    for (let i = 0; i < balls.length - 1; ++i) {
        // Get ball and reset collision
        let a = balls[i]
        
        // Check with boundary
        for (let boundary of boundaries) {
            boundaryCollision(screen, boundary, a, DEBUG_COLLISIONS)
        }

        // Check with other ball
        for (let j = i + 1; j < balls.length; ++j) {
            let b = balls[j]
            ballCollision(screen, a, b, DEBUG_COLLISIONS)
        }
    }

    // Reloop
    requestAnimationFrame(loop)
})