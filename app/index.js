/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import './style/main.scss'
import { Ball } from './code/geometry/ball'
import Vector, { randomWithBias } from './code/math/vector'
import { boundaryCollision, ballCollision, createCollisionExpirable } from './code/physics/collision'
import Screen from './code/ui/screen'
import { NoPartitioningStrategy } from './code/physics/partitioning/no-partition'
import { StaticGridPartitioningStrategy } from './code/physics/partitioning/static-grid'
import { DynamicGridPartitioningStrategy } from './code/physics/partitioning/dynamic-grid'
import { Controls, PartitionControl } from './code/ui/controls'
import { hookStats } from './code/ui/stats'
import { Clock } from './code/clock'
import { permutations } from './code/math/array'
import { MedianKDTreePartitioningStrategy } from './code/physics/partitioning/median-kd-tree'
import { BehaviorSubject, distinctUntilChanged, map, pipe, throttleTime } from 'rxjs'

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
        new DynamicGridPartitioningStrategy({ rows: 2, cols: 3 }),
        new MedianKDTreePartitioningStrategy()
    ]
})
let controls = new Controls(partitionControl)

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
    console.groupCollapsed('genearateBalls(' + number + ', ' + bias + ')')
    let balls = Array.from({ length: number }, (_, i) => {
        let ball = new Ball(
            Vector.random(-300, 300, -300, 300),
            Vector.random(-400, 400, -400, 400),
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
let balls = []
let expirables = []
controls.onGenerate(() => {
    balls = genearateBalls(controls.numberBalls, controls.sizeBias)
})

let nChecks$ = new BehaviorSubject(0)
let deltas$ = map(({ delta }) => `${delta}ms`)(clock.ticks$)
let framerate$ = map(({ delta }) => Math.round(1000 / delta))(clock.ticks$)

let statOperator = pipe(
    throttleTime(1000)
)

hookStats({
    '#cps': statOperator(nChecks$),
    '#delta': statOperator(deltas$),
    '#framerate': statOperator(framerate$)
})

/**
 * Runs each animation loop
 */
requestAnimationFrame(function loop() {
    // Environment and controls
    clock.tick()

    // Physics update step
    balls.forEach(ball => ball.update(clock.deltaSeconds))

    // Use partition algorithm to get possible collision checks
    let collisionChecks = partitionControl.strategy.partition(screen, balls)
    let boundaryChecks = permutations(balls, screen.boundaries)
    nChecks$.next(collisionChecks.length + boundaryChecks.length)

    // Boundary collision detection
    // TODO: Optimize this based on partitioning...
    let boundaryCollisions = boundaryChecks
        .map(([ball, boundary]) => boundaryCollision(boundary, ball))
        .filter(col => col !== null && col !== undefined)

    // Check ball-to-ball collisions
    let ballCollisions = collisionChecks
        .map(([a, b]) => ballCollision(a, b))
        .filter(col => col !== null && col !== undefined)

    // Add all collisions to expirables
    let collisions = [...boundaryCollisions, ...ballCollisions]
    if (controls.showCollisions && collisions.length > 0) {
        expirables.push(
            createCollisionExpirable({
                collisions,
                frames: 100,
                style: {
                    lineWidth: 3,
                    length: 20,
                    color: {
                        a: 'green',
                        b: 'red',
                        parallel: '#0ac'
                    }
                }
            })
        )
    }

    // ====== <Render Step> ========

    screen.clear()

    // If show Partitions is set, we'll draw partition state
    if (controls.showPartitions) {
        partitionControl.strategy.draw(screen, balls)
        collisionChecks.forEach(([a, b]) => {
            screen.drawLine(a.pos, b.pos, '#eee')
        })
    }

    // Draw expirables
    expirables = expirables.filter(xp => xp.alive)
    expirables.forEach(xp => xp.draw(screen))

    // Draw balls after partitioning so they're overhead
    balls.forEach(ball => ball.draw(screen))

    // ====== </Render Step> ========

    // Reloop
    requestAnimationFrame(loop)
})