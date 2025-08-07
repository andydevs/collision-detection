/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import { uniquePairs } from "../../math/array"
import Vector from "../../math/vector";
import { PartitionStrategy } from "./strategy"


const MAX_N = 8
const START_AXIS = 'x'

class KDTree {
    constructor(params) {
        this.parent = null
        this.rect = params.rect
        this.axis = params.axis
        this.value = params.value
        this.a = params.a
        this.b = params.b

        if (this.a !== null) {
            this.a.parent = this
        }
        if (this.b !== null) {
            this.b.parent = this
        }
    }

    traverse(callback, start = 0) {
        callback(this, start)
        if (this.a !== null) {
            this.a.traverse(callback, start + 1)
        }
        if (this.b !== null) {
            this.b.traverse(callback, start + 1)
        }
    }

    rangeQuery(q) {
        let results = []
        if (this.value !== q && this.value.boundingBox.overlaps(q.boundingBox)) {
            results.push(this.value)
        }
        if (this.a !== null) {
            results.push(...this.a.rangeQuery(q))
        }
        if (this.b !== null) {
            results.push(...this.b.rangeQuery(q))
        }
        return results
    }
}


export class MedianKDTreePartitioningStrategy extends PartitionStrategy {
    /**
     * Get id of strategy
     */
    get id() { return 'median-kdtree' }

    /**
     * Get display name of strategy
     */
    get displayName() { return 'Median KD Tree' }

    /**
     * Build and return a K-D tree of the balls in screen
     * using the median
     * 
     * @param {Rect} cell rectangular region being considered
     * @param {Ball[]} balls array of balls being checked
     * @param {'x' | 'y'} axis along which to sort + divide balls
     * @param {number} n limit n
     * 
     * @returns {KDTree} K-D tree
     */
    _buildKDTree(cell, balls, axis, n) {
        if (balls.length <= 0 || n <= 0) { return null }
        balls.sort((a, b) => a.pos[axis] - b.pos[axis])
        let median = balls[Math.floor(balls.length / 2)]
        let [cellA, cellB] = cell['divide' + axis.toLocaleUpperCase()](median.pos[axis])
        let ballsA = balls.filter(b => b !== median && b.boundingBox.overlaps(cellA))
        let ballsB = balls.filter(b => b !== median && b.boundingBox.overlaps(cellB))
        let newAxis = axis === 'x' ? 'y' : 'x'
        let kdtreeA = this._buildKDTree(cellA, ballsA, newAxis, n - 1)
        let kdtreeB = this._buildKDTree(cellB, ballsB, newAxis, n - 1)
        return new KDTree({
            rect: cell,
            axis,
            value: median,
            a: kdtreeA,
            b: kdtreeB
        })
    }

    /**
     * Take the current Screen and Balls array and
     * Return a list of collision checks for each
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     * 
     * @returns {Ball[][]} list of possible collision checks we can make
     */
    partition(screen, balls) {
        let tree = this._buildKDTree(screen.worldRect, balls, START_AXIS, MAX_N)
        let checks = balls
            .flatMap(a => tree.rangeQuery(a).map((b) => ({ u: [a, b] })))
            .map(({ u }) => u)
        return checks
    }

    /**
     * Draws the current partition state on the screen
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     */
    draw(screen, balls) {
        let tree = this._buildKDTree(screen.worldRect, balls, START_AXIS, MAX_N)
        tree.traverse((t) => {
            if (t.axis === 'x') {
                screen.drawLine(
                    new Vector(t.value.pos.x, t.rect.y0),
                    new Vector(t.value.pos.x, t.rect.y1),
                    '#999'
                )
            }
            else {
                screen.drawLine(
                    new Vector(t.rect.x0, t.value.pos.y),
                    new Vector(t.rect.x1, t.value.pos.y),
                    '#999'
                )
            }
        })
    }
}