/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import { RectGizmo } from "../ui/gizmos";
import { uniquePairs } from '../math/array';

/**
 * Do not perform any partitioning and return 
 * all possible unique pairs
 * 
 * @param {Screen} screen screen being mapped over
 * @param {Array} balls balls to find collision checks on
 * @param {int} time current time in ms
 * @param {Array} gizmos gizmos arrays
 * @param {boolean} debug print debug information
 * 
 * @returns collision pairs
 */
export function noPartitioning(screen, balls, time, gizmos, debug=false) {
    return uniquePairs(balls)
}

/**
 * Generate an static partitioning algorithm which partitions
 * balls based on their loose position in a static grid
 * 
 * @param {int} columns columns in grid
 * @param {int} rows rows in grid
 * 
 * @returns Partition function in grid
 */
export function staticPartitioningGrid(rows, columns) {
    /**
     * Partition particles based on their positions in the static grid
     * 
     * @param {Screen} screen screen being mapped over
     * @param {Array} balls balls to find collision checks on
     * @param {int} time current time in ms
     * @param {Array} gizmos gizmos arrays
     * @param {boolean} debug print debug information
     * 
     * @returns collision pairs
     */
    return function staticPartitioning(screen, balls, time, gizmos, debug=false) {
        // Create cells
        let cells = screen.worldRect.partition(columns, rows)
        if (debug) {
            gizmos.push(...cells.map(cell =>
                new RectGizmo(time + 10, cell, '#999')    
            ))
        }

        // Find partitions
        return cells.flatMap(cell =>
            uniquePairs(
                balls.filter(ball => 
                    ball.boundingBox.overlaps(cell))
            )
        )
    }
}


/**
 * Generate a dynamic partitioning algorithm which partitions
 * balls based on their loose position in a dynamically allocated grid
 * 
 * @param {int} columnFactor column number to subdivide cell by
 * @param {int} rowFactor row number to subdivide cell by
 * @param {int} maxStack maximum stack to recurse into
 * 
 * @returns partition function for dynamic grid
 */
export function dynamicPartitioningGrid(columnFactor, rowFactor, maxStack=5) {
    /**
     * Generate a dynamic grid and find collisions
     * 
     * @param {Screen} screen screen being mapped over
     * @param {Array} balls balls to find collision checks on
     * @param {int} time current time in ms
     * @param {Array} gizmos gizmos arrays
     * @param {boolean} debug print debug information
     * 
     * @returns collision pairs
     */
    return function dynamicPartitioning(screen, balls, time, gizmos, debug=false) {
        let recursivePartition = (balls, root, colF=columnFactor, rowF=rowFactor, stack=maxStack) => {
            // Base conditions
            if (balls.length < 2) { return [] }
            if (balls.length === 2 || stack === 0) { return [{ u: balls }] }

            // Partition cells
            let cells = root.partition(colF, rowF)
            if (debug) {
                gizmos.push(...cells.map(cell =>
                    new RectGizmo(time + 10, cell, '#999')    
                ))
            }

            // Subdivide partitions
            return cells.flatMap(cell =>
                recursivePartition(
                    balls.filter(ball => ball.boundingBox.overlaps(cell)),
                    cell, rowF, colF, stack - 1)
            )
        }
        return recursivePartition(balls, screen.worldRect).map(({u}) => u)
    }
}