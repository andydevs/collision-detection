/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import { PartitionStrategy } from "./strategy"

/**
 * Divide screen into dynamic grid
 */
export class DynamicGridPartitioningStrategy extends PartitionStrategy {
    /**
     * Create DynamicGridPartitioningStrategy
     */
    constructor(params) {
        super()
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
     * Draw cells partitioning
     */
    _recursivePartitionDraw = (screen, balls, cell, maxRec) => {
        screen.drawRect(cell, '#999')

        // Base condition
        if (balls.length <= 2 || maxRec <= 0 ) { return }

        // Subdivide partitions
        cell.partition(this.cols, this.rows).forEach(subcell => {
            let sballs = balls.filter(ball => ball.boundingBox.overlaps(subcell))
            return this._recursivePartitionDraw(screen, sballs, subcell, maxRec - 1)
        })
    }

    /**
     * Recursive partitioning
     */
    _recursivePartition = (balls, cell, maxRec) => {
        // Base conditions
        if (balls.length < 2 || maxRec <= 0) { return [] }
        if (balls.length === 2) { return [ { u: balls } ] }

        // Subdivide partitions
        return cell.partition(this.cols, this.rows).flatMap(subcell => {
            let subballs = balls.filter(ball => ball.boundingBox.overlaps(subcell))
            return this._recursivePartition(subballs, subcell, maxRec - 1)
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
        return this._recursivePartition(balls, screen.worldRect, this.maxRec)
            .map(({ u }) => u)
    }

    /**
     * Draws the current partition state on the screen
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     */
    draw(screen, balls) {
        this._recursivePartitionDraw(screen, balls, screen.worldRect, this.maxRec)
    }
}