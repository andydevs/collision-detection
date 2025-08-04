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
import Screen from './code/ui/screen'
import { NoPartitioningStrategy } from './code/physics/partitioning/no-partition'
import { StaticGridPartitioningStrategy } from './code/physics/partitioning/static-grid'
import { DynamicGridPartitioningStrategy } from './code/physics/partitioning/dynamic-grid'
import { Controls, PartitionControl } from './code/ui/controls'
import { Stats } from './code/ui/stats'
import { Clock } from './code/clock'
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

/**
 * Here we'll create a list of partition strategies
 * 
 * Partition control will handle setting the options field
 */
let partitionControl = new PartitionControl({
    strategies: [
        new NoPartitioningStrategy(),
        new StaticGridPartitioningStrategy({ rows: 3, cols: 5 }),
        new StaticGridPartitioningStrategy({ rows: 6, cols: 10 }),
        new DynamicGridPartitioningStrategy({ rows: 2, cols: 2 }),
        new DynamicGridPartitioningStrategy({ rows: 2, cols: 3 })
    ]
})
let controls = new Controls(partitionControl)

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
    // TODO: Optimize this based on partitioning...
    permutations(balls, screen.boundaries).forEach(([ball, boundary]) => {
        boundaryCollision(screen, boundary, ball, clock.time, gizmos, controls.showCollisions)
    })

    // Use partition algorithm to get possible collision checks
    let collisions = partitionControl.strategy.partition(screen, balls)
    nChecks = collisions.length
    
    // Check collisions
    collisions.forEach(([a, b]) => {
        ballCollision(screen, a, b, clock.time, gizmos, controls.showCollisions)
    })

    // Render step
    screen.clear()

    // ==> Here if debug partitioning is set, we'll draw partition state
    if (controls.showPartitions) {
        partitionControl.strategy.draw(screen, balls)
        collisions.forEach(([a, b]) => {
            screen.drawLine(a.pos, b.pos, '#eee')
        })
    }

    gizmos = gizmos.filter(g => g.stillvalid(clock))
    gizmos.forEach(gizmo => gizmo.draw(screen))
    balls.forEach(ball => ball.draw(screen))

    // Reloop
    requestAnimationFrame(loop)
})