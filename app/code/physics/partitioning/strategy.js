/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

/**
 * Interface class since javascript 
 * doesn't support interfaces and I
 * won't just convert everything to
 * typescript in this branch...
 */
export class PartitionStrategy {
    /**
     * Get id of strategy
     */
    get id() { return '' }

    /**
     * Get display name of strategy
     */
    get displayName() { return '' }

    /**
     * Take the current Screen and Balls array and
     * Return a list of collision checks for each
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     * 
     * @returns {Ball[][]} list of possible collision checks we can make
     */
    partition(screen, balls) {}

    /**
     * Draws the current partition state on the screen
     * 
     * @param {Screen} screen screen space being partitioned
     * @param {Ball[]} balls list of balls to partition within screen
     */
    draw(screen, balls) {}

}