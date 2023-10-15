/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'
import { Ball } from './geometry'
import Vector, { randomWithBias } from './vector'
import { boundaryCollision, ballCollision } from './physics'
import { evenPartitioningGrid, noPartitioning } from './partitioning'
import Screen from './screen'
import { LineGizmo } from './gizmos'

// Create a screen
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let screen = new Screen(ctx)

/**
 * Initialize balls and boundaries
 * 
 * @param {int} number number of balls to generate
 * @param {float} bias (0 to 1) bias towards bigger (0) or smaller (1) balls
 * 
 * @returns balls and boundaries generated
 */
function genearateBalls(number, bias) {
    console.groupCollapsed('genearateBalls')
    let ballColors = [
        'cyan', 'lime', 'coral',
        'yellow', 'violet', 'white'
    ]
    let balls = []
    for (let i = 0; i < number; i++) {
        let ball = new Ball(
            Vector.random(-300, 300, -300, 300),
            Vector.random(-5, 5, -5, 5),
            randomWithBias(5, 30, bias, 0),
            ballColors[i % ballColors.length]
        )
        console.log(ball)
        balls.push(ball)
    }
    console.groupEnd()
    return balls
}

// Initialize
let gizmos = []
let balls = []
function generateSubmit() {
    let numberOfBalls = parseInt(document.querySelector('#number-balls').value)
    let sizeBias = parseFloat(document.querySelector('#size-bias').value)
    balls = genearateBalls(numberOfBalls, sizeBias)
}
document.querySelector('#generate-balls').onclick = generateSubmit
generateSubmit()

// Partitioning algorithms
let partitioning = {
    'none': noPartitioning,
    'even-grid-3-5': evenPartitioningGrid(3, 5),
    'even-grid-6-10': evenPartitioningGrid(6, 10)
}

// Timing
var last = null
var time = Date.now()

// Update render time on an interval
setInterval(() => {
    let delta = time - last
    let framerate = Math.round(1000/delta)
    document.querySelector('#delta').innerHTML = `${delta}ms`
    document.querySelector('#framerate').innerHTML = `${framerate}`
}, 1000)

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
    // Current time
    last = time
    time = Date.now()

    // Debug flags
    let DEBUG_COLLISIONS = document.querySelector('#show-collision').checked
    let DEBUG_PARTITIONING = document.querySelector('#show-partitions').checked

    // Partitioning selection
    let partSelection = document.querySelector('#partition-type').value
    let partitionFunc = partitioning[partSelection]

    // Physics update step
    for (let ball of balls) { ball.update() }
    
    // Boundary collision detection
    for (const ball of balls) {
        for (const boundary of screen.boundaries) {
            boundaryCollision(screen, boundary, ball, time, gizmos, DEBUG_COLLISIONS)
        }
    }
    
    // Partition type
    let collisions = partitionFunc(screen, balls, time, gizmos, DEBUG_PARTITIONING)
    for (const [a, b] of collisions) {
        if (DEBUG_PARTITIONING) {
            gizmos.push(new LineGizmo(time + 10, a.pos, b.pos))
        }
        ballCollision(screen, a, b, time, gizmos, DEBUG_COLLISIONS)
    }

    // Render step
    screen.clear()
    gizmos = gizmos.filter(g => time < g.expires)
    for (const gizmo of gizmos) {
        gizmo.draw(screen)
    }
    for (const ball of balls) { ball.draw(screen) }

    // Reloop
    requestAnimationFrame(loop)
})