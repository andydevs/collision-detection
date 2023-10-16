import Vector from "./vector"

/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
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
}