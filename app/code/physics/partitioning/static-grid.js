/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
const { uniquePairs } = require('../../math/array')
import { PartitionStrategy } from "./strategy"


/**
 * Divide screen into even grid
 */
export class StaticGridPartitioningStrategy extends PartitionStrategy {
    /**
     * Create StaticGridPartitioningStrategy
     */
    constructor(params) {
        this.rows = params.rows
        this.cols = params.cols
    }

    /**
     * Get id of strategy
     */
    get id() { return `static-grid-${this.cols}-by-${this.rows}` }

    /**
     * Get display name of strategy
     */
    get displayName() { return `Static Grid ${this.cols}x${this.rows}` }

    /**
     * Get cells from screen
     */
    _getCells(screen) {
        return screen.worldRect.partition(this.cols, this.rows)
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
        let cells = this._getCells(screen)
        return cells.flatMap(cell =>
            uniquePairs(
                balls.filter(ball => 
                    ball.boundingBox.overlaps(cell)
                )
            )
        )
    }

    /**
     * Draws the current partition state on the screen
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     */
    draw(screen, _balls) {
        this._getCells(screen).forEach(cell => {
            screen.drawRect(cell)
        })
    }
}