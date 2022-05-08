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
let DEBUG_KDTREE = true
let DEBUG_COLLISIONS = false
let NUMBER = 50

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
            randomWithBias(5, 50, 0.80)
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
    
    let middle = arr => Math.floor(arr.length / 2)

    function kdnode(dim, box, barr) {
        // End conditions
        if (barr.length === 1) return
    
        // Get median index
        barr.sort((a, b) => a.pos[dim] - b.pos[dim])
        let med = barr[middle(barr)].pos[dim]

        // Draw median lines
        if (DEBUG_KDTREE) {
            screen.drawLine(
                new Vector(
                    dim === 'x' ? med : box.x[0],
                    dim === 'y' ? med : box.y[0]
                ),
                new Vector(
                    dim === 'x' ? med : box.x[1],
                    dim === 'y' ? med : box.y[1]
                ),
                '#aaaaaa', 1
            )
        }

        // Median-based partition
        if (dim === 'x') {
            kdnode('y', { 
                x: [box.x[0], med], 
                y: [...box.y] 
            }, barr.slice(0, middle(barr)))
            kdnode('y', { 
                x: [med, box.x[1]], 
                y: [...box.y] 
            }, barr.slice(middle(barr)))
        }
        else {
            kdnode('x', { 
                x: [...box.x], 
                y: [box.y[0], med] 
            }, barr.slice(0, middle(barr)))
            kdnode('x', { 
                x: [...box.x], 
                y: [med, box.y[1]] 
            }, barr.slice(middle(barr)))
        }
    }
    kdnode('x', { 
        x: [-screen.W/2, screen.W/2], 
        y: [-screen.H/2, screen.H/2] 
    }, balls)

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