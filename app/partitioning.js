import { CircleGizmo, LineGizmo } from "./gizmos";
import { Rect } from "./rect";
import Vector from "./vector";

/**
 * Generate pairs of items so that no to items 
 * appear more than once as a pair in either order
 * 
 * @param {Array} items items to pair up
 * 
 * @returns unique pairs of items
 */
function uniquePairs(items) {
    return items.flatMap((a, i) => items.slice(i+1).map(b => [a, b]))
}

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
        // Create breakpoints
        let createBreakpoints = (divisor, length, shifted) =>
            Array.from({ length: divisor + 1 }, 
                (_, i) => i*length/divisor - shifted)
        let columnBreaks = createBreakpoints(columns, screen.W, screen.X)
        let rowBreaks = createBreakpoints(rows, screen.H, screen.Y)

        // Add gizmos
        if (debug) {
            gizmos.push(...columnBreaks.map(brk => 
                new LineGizmo(time + 10, 
                    new Vector(brk, -screen.Y), 
                    new Vector(brk, screen.Y))))
            gizmos.push(...rowBreaks.map(brk =>
                new LineGizmo(time + 10,
                    new Vector(-screen.X, brk),
                    new Vector(screen.X, brk))))
        }

        // Bins
        let pairs = []
        for (let i = 0; i < columnBreaks.length - 1; ++i) {
            for (let j = 0; j < rowBreaks.length - 1; ++j) {
                let cell = new Rect(
                    columnBreaks[i],
                    columnBreaks[i + 1],
                    rowBreaks[j],
                    rowBreaks[j + 1]
                )
                let contents = balls.filter(ball => 
                    ball.boundingBox.overlaps(cell))
                if (debug) {
                    let { x0, x1, y0, y1 } = cell
                    gizmos.push(new CircleGizmo(time + 10,
                        new Vector((x0+x1)/2, (y0+y1)/2),
                        contents.length * 2,
                        contents.length > 1 ? '#544' : '#444'))
                }
                pairs.push(...uniquePairs(contents))
            }
        }

        // Return list of possible collisions
        return pairs
    }
}