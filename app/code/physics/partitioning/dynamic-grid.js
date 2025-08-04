/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
const { uniquePairs } = require('../../math/array')
import { PartitionStrategy } from "./strategy"


/**
 * Divide screen into dynamic grid
 */
export class DynamicGridPartitioningStrategy extends PartitionStrategy {
    /**
     * Create DynamicGridPartitioningStrategy
     */
    constructor(params) {
        this.rows = params.rows
        this.cols = params.cols
        this.maxRec = params.maxRec || 5
    }

    /**
     * Get id of strategy
     */
    get id() { return `dynamic-grid-${this.cols}-by-${this.rows}` }

    /**
     * Get display name of strategy
     */
    get displayName() { return `Dynamic Grid ${this.cols}x${this.rows}` }

    /**
     * Recursive partitioning
     */
    _recursivePartition = (balls, cell, returnCells, maxRec) => {
        // Base conditions
        if (balls.length < 2) { return [] }
        if (balls.length === 2 || maxRec <= 0 ) { 
            return [ returnCells ? cell : { u: balls } ]
        }

        // Subdivide partitions
        let subcells = cell
            .partition(this.cols, this.rows)
            .flatMap(subcell => {
                let subballs = balls.filter(ball => ball.boundingBox.overlaps(subcell))
                return this._recursivePartition(subballs, subcell, returnCells, maxRec - 1)
            })
        if (returnCells) {
            subcells.push(cell)
        }
        return subcells
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
        return this._recursivePartition(balls, screen.worldRect, false, this.maxRec)
            .map(({ u }) => u)
    }

    /**
     * Draws the current partition state on the screen
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     */
    draw(screen, balls) {
        this._recursivePartition(balls, screen.worldRect, true, this.maxRec)
            .foreEach(cell => {
                screen.drawRect(cell, '#999')
            })
    }
}