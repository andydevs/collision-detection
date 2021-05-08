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
let PAUSE_ON_COLLISION = false
let DEBUG_COLLISIONS = false
let WAIT_TIME = 100

// Create a screen
const screen = new Screen('canvas')

// Get screen boundaries
let boundaries = [
    new Boundary(new Vector(0, screen.Y), new Vector(0, -1)),
    new Boundary(new Vector(0, -screen.Y), new Vector(0, 1)),
    new Boundary(new Vector(screen.X, 0), new Vector(-1, 0)),
    new Boundary(new Vector(-screen.X, 0), new Vector(1, 0))
]

// Generate a bunch of balls
const number = 80
let balls = []
for (let i = 0; i < number; i++) {
    balls.push(
        new Ball(
            Vector.random(-300, 300, -300, 300),
            Vector.random(-5, 5, -5, 5),
            randomWithBias(5, 50, 0.75)
        )
    )
}

/**
 * Animation routine
 * 
 * Each animation frame runs until yield
 */
function *routine() {
    // Setup part
    let collision

    // Loop part
    while (true) 
    {
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
            collision = false
            
            // Check with boundary
            for (let boundary of boundaries) {
                collision ||= boundaryCollision(
                    screen, boundary, a,
                    PAUSE_ON_COLLISION || DEBUG_COLLISIONS)
            }

            // Check with other ball
            for (let j = i + 1; j < balls.length; ++j) {
                let b = balls[j]
                collision ||= ballCollision(
                    screen, a, b,
                    PAUSE_ON_COLLISION || DEBUG_COLLISIONS)
            }

            // Wait if we've collided and we're pausing on each collision
            if (PAUSE_ON_COLLISION && collision) {
                for (let i = 0; i < WAIT_TIME; ++i) {
                    yield;
                }
            }
        }

        yield;
    }
}

/**
 * Animation coroutine. Runs each yield in an animation frame
 * 
 * @param {Generator} routine animation routine
 */
function animateRoutine(routine) {
    let generator = routine();
    function anim() {
        if (generator.next()) {
            requestAnimationFrame(anim)
        }
    }
    requestAnimationFrame(anim)
}

animateRoutine(routine)