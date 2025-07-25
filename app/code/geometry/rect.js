/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import Vector from "../math/vector"
import { numberRange, permutations, linearBreaks } from '../math/array';

/**
 * Generic rectangle
 */
export class Rect {
    constructor(x0, x1, y0, y1) {
        this.x0 = x0
        this.x1 = x1
        this.y0 = y0
        this.y1 = y1
    }

    overlaps(rect) {
        return (this.x0 < rect.x1 && rect.x0 <= this.x1)
            && (this.y0 < rect.y1 && rect.y0 <= this.y1)
    }

    get pos0() {
        return new Vector(this.x0, this.y0)
    }

    get pos1() {
        return new Vector(this.x1, this.y1)
    }

    get center() {
        let { x0, x1, y0, y1 } = this
        return new Vector((x0+x1)/2, (y0+y1)/2)
    }

    partition(columns, rows) {
        let columnBreaks = linearBreaks(this.x0, this.x1, columns + 1)
        let rowBreaks = linearBreaks(this.y0, this.y1, rows + 1)
        return permutations(
                numberRange(columnBreaks.length - 1),
                numberRange(rowBreaks.length - 1)
            )
            .map(([i, j]) => new Rect(
                columnBreaks[i],
                columnBreaks[i + 1],
                rowBreaks[j],
                rowBreaks[j + 1]
            ))
    }
}