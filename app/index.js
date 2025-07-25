/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'
import { Ball } from './code/geometry/ball'
import Vector, { randomWithBias } from './code/math/vector'
import { boundaryCollision, ballCollision } from './code/physics/collision'
import * as partitonTypes from './code/physics/partitioning'
import Screen from './code/ui/screen'
import { LineGizmo } from './code/ui/gizmos'
import { Controls, PartitionControl } from './code/ui/controls';
import { Stats } from './code/ui/stats';
import { Clock } from './code/clock';

// Options for partitions
let partitions = new PartitionControl({
    'none': {
        display: 'No Partitioning',
        func: partitonTypes.noPartitioning
    },
    'even-grid-3-5':{
        display: 'Even Grid 3x5',
        func: partitonTypes.staticPartitioningGrid(3, 5)
    },
    'even-grid-6-10': {
        display: 'Even Grid 6x10',
        func: partitonTypes.staticPartitioningGrid(6, 10)
    },
    'dynamic-grid-2-2': {
        display: 'Dynamic Grid 2x2',
        func: partitonTypes.dynamicPartitioningGrid(2, 2)
    },
    'dynamic-grid-3-2': {
        display: 'Dynamic Grid 3x2',
        func: partitonTypes.dynamicPartitioningGrid(3, 2)
    }
})

// Create a screen and controls
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let screen = new Screen(ctx)
let controls = new Controls(partitions)
let stats = new Stats()
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
    balls = genearateBalls(controls.numberBalls, controls.sizeBias)
})

// Buffer to hold current collision checks
let collisions = []

// Update render time on an interval
setInterval(() => {
    // Update frame stats
    stats.frameDelta = clock.delta
    stats.framerate = clock.framerate

    // Update collision stats
    stats.cps = balls.length*screen.boundaries.length
                + collisions.length
}, 1000)

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
    // Environment and controls
    clock.tick()
    let DEBUG_COLLISIONS = controls.showCollisions
    let DEBUG_PARTITIONING = controls.showPartitions
    let partitionFunc = partitions.func

    // Physics update step
    for (let ball of balls) { ball.update() }
    
    // Boundary collision detection
    for (const ball of balls) {
        for (const boundary of screen.boundaries) {
            boundaryCollision(screen, boundary, ball, clock.time, gizmos, DEBUG_COLLISIONS)
        }
    }
    
    // Use partition algorithm to get possible collision checks
    collisions = partitionFunc(screen, 
        balls, clock.time, 
        gizmos, DEBUG_PARTITIONING)

    // Check collisions
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