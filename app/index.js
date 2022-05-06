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
const DEBUG_COLLISIONS = true
const NUMBER = 25

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
            randomWithBias(5, 50, 0.75)
        )
    )
}

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
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