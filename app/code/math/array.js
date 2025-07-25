/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

/**
 * Return range of numbers from start to stop in increments of step
 * 
 * @param {int} start start (or stop) of range (start defaults to 0 if not specified)
 * @param {int} stop final number of range
 * @param {int} step increment step
 */
export function numberRange(start, stop=undefined, step=1) {
    if (stop === undefined) {
        stop = start
        start = 0
    }
    return Array.from(
        { length: Math.ceil((stop - start)/step) },
        (_, i) => start + i*step)
}

/**
 * Generate pairs of items so that no to items 
 * appear more than once as a pair in either order
 * 
 * @param {Array} items items to pair up
 * 
 * @returns unique pairs of items
 */
export function uniquePairs(items) {
    return items.flatMap((a, i) => items.slice(i+1).map(b => [a, b]))
}

/**
 * Return array containing all permutations of items in each array
 * 
 * @param {Array} array1 first array to pair up
 * @param {Array} array2 second array to pair up
 * 
 * @returns pairs of arrays 
 */
export function permutations(array1, array2) {
    return array1.flatMap(e1 => array2.map(e2 => [e1, e2]))
}

/**
 * Return array of n breakpoints linearly between 
 * start and stop index including stop index
 * 
 * @param {int} start starting integer index
 * @param {int} stop ending integer index
 * @param {int} n number of breaks
 * 
 * @returns {Array} array of breakpoints
 */
export function linearBreaks(start, stop, n) {
    let step = (stop - start)/(n - 1)
    return Array.from({ length: n }, (_, i) => start + step*i)
}