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
import { dynamicPartitioningGrid, staticPartitioningGrid, noPartitioning } from './partitioning'
import Screen from './screen'
import { LineGizmo } from './gizmos'
import { Controls } from './controls';
import { Clock } from './clock';

// Create a screen and controls
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let screen = new Screen(ctx)
let controls = new Controls()
let clock = new Clock()

// Initialize game environments
let gizmos = []
let balls = []

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
controls.onGenerate(() => {
    let numberOfBalls = parseInt(document.querySelector('#number-balls').value)
    let sizeBias = parseFloat(document.querySelector('#size-bias').value)
    balls = genearateBalls(numberOfBalls, sizeBias)
})

// Timing

// Update render time on an interval
setInterval(() => {
    controls.frameDelta = clock.delta
    controls.framerate = clock.framerate
}, 1000)

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
    // Environment and controls
    clock.tick()
    let DEBUG_COLLISIONS = controls.showCollisions
    let DEBUG_PARTITIONING = controls.showPartitions
    let partitionFuncs = {
        'none': noPartitioning,
        'even-grid-3-5': staticPartitioningGrid(3, 5),
        'even-grid-6-10': staticPartitioningGrid(6, 10),
        'dynamic-grid-2-2': dynamicPartitioningGrid(2, 2),
        'dynamic-grid-3-2': dynamicPartitioningGrid(3, 2)
    }
    let partSelection = controls.partitionType
    let partitionFunc = partitionFuncs[partSelection]

    // Physics update step
    for (let ball of balls) { ball.update() }
    
    // Boundary collision detection
    for (const ball of balls) {
        for (const boundary of screen.boundaries) {
            boundaryCollision(screen, boundary, ball, clock.time, gizmos, DEBUG_COLLISIONS)
        }
    }
    
    // Partition type
    let collisions = partitionFunc(screen, balls, clock.time, gizmos, DEBUG_PARTITIONING)
    for (const [a, b] of collisions) {
        if (DEBUG_PARTITIONING) {
            gizmos.push(new LineGizmo(clock.time + 10, a.pos, b.pos))
        }
        ballCollision(screen, a, b, clock.time, gizmos, DEBUG_COLLISIONS)
    }

    // Render step
    screen.clear()
    gizmos = gizmos.filter(g => g.stillvalid(clock))
    gizmos.forEach(gizmo => gizmo.draw(screen))
    balls.forEach(ball => ball.draw(screen))

    // Reloop
    requestAnimationFrame(loop)
})