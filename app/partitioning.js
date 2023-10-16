/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import { CircleGizmo, RectGizmo } from "./gizmos";
import { Rect } from "./rect";
import { uniquePairs, numberRange, permutations, linearBreaks } from './array';

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
 * Generate an even partitioning algorithm which partitions
 * balls based on their loose position in a static grid
 * 
 * @param {int} rows rows in grid
 * @param {int} columns columns in grid
 * 
 * @returns Partition function in grid
 */
export function evenPartitioningGrid(rows, columns) {
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
    return function evenPartitioning(screen, balls, time, gizmos, debug=false) {
        // Create cells
        let columnBreaks = linearBreaks(-screen.X, screen.X, columns + 1)
        let rowBreaks = linearBreaks(-screen.Y, screen.Y, rows + 1)
        let cells = permutations(
                numberRange(columnBreaks.length - 1),
                numberRange(rowBreaks.length - 1)
            )
            .map(([i, j]) => new Rect(
                columnBreaks[i],
                columnBreaks[i + 1],
                rowBreaks[j],
                rowBreaks[j + 1]
            ))
        if (debug) {
            gizmos.push(...cells.map(cell =>
                new RectGizmo(time + 10, cell)    
            ))
        }

        // Find partitions
        let partitions = cells.map(cell => ({ cell,
            balls: balls.filter(ball => ball.boundingBox.overlaps(cell))
        }))
        if (debug) {
            gizmos.push(...partitions.map(({ cell, balls }) =>
                new CircleGizmo(time + 10,
                    cell.center,
                    balls.length * 2,
                    balls.length > 1 ? '#544' : '#444')
            ))
        }
        return partitions.flatMap(({ balls }) =>
            uniquePairs(balls)
        )
    }
}


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
export function dynamicGridPartitioning(screen, balls, time, gizmos, debug=false) {
    

    // No pairs
    return []
}