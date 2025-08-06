/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import { uniquePairs } from "../../math/array"
import { PartitionStrategy } from "./strategy"


const MAX_N = 5

export class MedianKDTreePartitioningStrategy extends PartitionStrategy {
    /**
     * Get id of strategy
     */
    get id() { return 'median-kdtree' }

    /**
     * Get display name of strategy
     */
    get displayName() { return 'Median KD Tree' }

    _partitionCells(cell, balls, dimension, n) {
        if (balls.length < 2 || n <= 0) { return [cell] }

        let vals = balls.map(b => b.pos[dimension])
        vals.sort((a, b) => a - b)
        let median = vals[Math.floor(vals.length / 2)]

        let subcells
        switch (dimension) {
            case 'y':
                subcells = cell.divideY(median)
                break
            case 'x':
            default:
                subcells = cell.divideX(median)
                break
        }

        return subcells.flatMap((subcell) => {
            let newDimension
            switch (dimension) {
                case 'y':
                    newDimension = 'x'
                    break
                case 'x':
                default:
                    newDimension = 'y'
                    break
            }
            let subballs = balls.filter(b => b.boundingBox.overlaps(subcell))
            return this._partitionCells(subcell, subballs, newDimension, n - 1)
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
        // Partition by median
        let cells = this._partitionCells(screen.worldRect, balls, 'x', MAX_N)
        return cells.flatMap((cell) => {
            return uniquePairs(balls.filter(b => b.boundingBox.overlaps(cell)))
        })
    }

    /**
     * Draws the current partition state on the screen
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     */
    draw(screen, balls) {
        let cells = this._partitionCells(screen.worldRect, balls, 'x', MAX_N)
        cells.forEach(cell => {
            screen.drawRect(cell, '#555')
        });
    }
}