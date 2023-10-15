/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'
import Vector, { randomWithBias } from './vector'
import { Ball, Boundary, boundaryCollision, ballCollision } from './physics'
import Screen from './screen'

// Parameters
let DEBUG_INITIALIZATION = false

// Create a screen
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let screen = new Screen(ctx)

/**
 * Initialize balls and boundaries
 * 
 * @param {Screen} screen screen instance to generate
 * @param {int} number number of balls to generate
 * @param {float} bias (0 to 1) bias towards bigger (0) or smaller (1) balls
 * @param {boolean} debug print debug statements if true
 * 
 * @returns balls and boundaries generated
 */
function generateBallsAndBoundaries(screen, number, bias, debug) {
    // Initialize group if need to
    if (debug) {
        console.group('initialization')
    }
    
    // Get screen boundaries
    let boundaries = [
        new Boundary(new Vector(0, screen.Y), new Vector(0, -1)),
        new Boundary(new Vector(0, -screen.Y), new Vector(0, 1)),
        new Boundary(new Vector(screen.X, 0), new Vector(-1, 0)),
        new Boundary(new Vector(-screen.X, 0), new Vector(1, 0))
    ]
    if (debug) {
        for (const boundary of boundaries) {
            console.log(boundary)
        }
    }
    
    let ballColors = [
        'cyan',
        'lime',
        'coral',
        'yellow',
        'violet',
        'white'
    ]
    
    // Generate a bunch of balls
    let balls = []
    for (let i = 0; i < number; i++) {
        let ball = new Ball(
            Vector.random(-300, 300, -300, 300),
            Vector.random(-5, 5, -5, 5),
            randomWithBias(5, 50, bias, 0),
            ballColors[i % ballColors.length]
        )
        if (debug) {
            console.log(ball)
        }
        balls.push(ball)
    }
    
    // Return data
    if (debug) { console.groupEnd() }
    return { balls, boundaries, gizmos: [] }
}

// Initialize
var { 
    balls, 
    boundaries, 
    gizmos 
} = generateBallsAndBoundaries(screen, 10, 0.5, DEBUG_INITIALIZATION)

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
    // Debug systems
    let DEBUG_COLLISIONS = document.querySelector('#show-collision').checked

    // Current time
    let time = Date.now()

    // Render step
    screen.clear()
    for (const ball of balls) { ball.draw(screen) }
    // filter expired gizmos
    gizmos = gizmos.filter(g => time < g.expires)
    // Draw gizmos
    for (const gizmo of gizmos) {
        gizmo.draw(screen)
    }

    // Update step
    for (let ball of balls) { ball.update() }

    // Boundary collision detection
    for (const ball of balls) {
        for (const boundary of boundaries) {
            boundaryCollision(screen, boundary, ball, time, gizmos, DEBUG_COLLISIONS)
        }
    }

    // Collision detection
    for (let i = 0; i < balls.length - 1; ++i) {
        // Get ball and reset collision
        let a = balls[i]

        // Check with other ball
        for (let j = i + 1; j < balls.length; ++j) {
            let b = balls[j]
            ballCollision(screen, a, b, time, gizmos, DEBUG_COLLISIONS)
        }
    }

    // Reloop
    requestAnimationFrame(loop)
})