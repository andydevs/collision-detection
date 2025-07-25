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
import { permutations } from './code/math/array'

// Color palette for balls
const ballColors = [
    'cyan', 
    'lime', 
    'coral',
    'yellow', 
    'violet', 
    'white'
]

// Controls for updating simulation
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
let controls = new Controls(partitions)

// Simulation stats
let stats = new Stats()

// Simulation screen
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let screen = new Screen(ctx)
let clock = new Clock()

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
    let balls = Array.from({ length: number}, (_,i) => {
        let ball = new Ball(
            Vector.random(-300, 300, -300, 300),
            Vector.random(-5, 5, -5, 5),
            randomWithBias(5, 30, bias, 0),
            ballColors[i % ballColors.length]
        )
        console.log(ball)
        return ball
    })
    console.groupEnd()
    return balls
}


// Initialize game environment stuff
let gizmos = []
let balls = []
controls.onGenerate(() => {
    balls = genearateBalls(controls.numberBalls, controls.sizeBias)
})

// Buffer to hold current collision checks
let nChecks = 0

// Update render time on an interval
setInterval(() => {
    // Update frame stats
    stats.frameDelta = clock.delta
    stats.framerate = clock.framerate

    // Update collision stats
    stats.cps = balls.length * screen.boundaries.length + nChecks
}, 1000)

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
    // Environment and controls
    clock.tick()

    // Physics update step
    balls.forEach(ball => ball.update())
    
    // Boundary collision detection
    permutations(balls, screen.boundaries).forEach(([ball, boundary]) => {
        boundaryCollision(screen, boundary, ball, clock.time, gizmos, controls.showCollisions)
    })
    
    // Use partition algorithm to get possible collision checks
    let collisions = partitions.func(screen, 
        balls, clock.time, 
        gizmos, controls.showPartitions)
    nChecks = collisions.length

    // Check collisions
    collisions.forEach(([a, b]) => {
        if (controls.showPartitions) {
            gizmos.push(new LineGizmo(clock.time + 10, a.pos, b.pos))
        }
        ballCollision(screen, a, b, clock.time, gizmos, controls.showCollisions)
    })

    // Render step
    screen.clear()
    gizmos = gizmos.filter(g => g.stillvalid(clock))
    gizmos.forEach(gizmo => gizmo.draw(screen))
    balls.forEach(ball => ball.draw(screen))

    // Reloop
    requestAnimationFrame(loop)
})