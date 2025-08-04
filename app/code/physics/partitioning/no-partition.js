/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import { uniquePairs } from '../../math/array'
import { PartitionStrategy } from './strategy'

/**
 * Don't partition elements
 */
export class NoPartitioningStrategy extends PartitionStrategy {
    /**
     * Get id of strategy
     */
    get id() { return 'no-partitioning' }

    /**
     * Get display name of strategy
     */
    get displayName() { return 'No Partitioning' }

    /**
     * Take the current Screen and Balls array and
     * Return a list of collision checks for each
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     * 
     * @returns {Ball[][]} list of possible collision checks we can make
     */
    partition(_screen, balls) {
        return uniquePairs(balls)
    }

    /**
     * Draws the current partition state on the screen
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     */
    draw(_screen, _balls) {}
}