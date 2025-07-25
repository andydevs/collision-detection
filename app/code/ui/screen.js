/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import Vector from '../math/vector'
import { Rect } from '../geometry/rect';

/**
 * Static boundary
 */
export class Boundary {
    /**
     * Construct boundary
     * 
     * @param {Vector} pos position of boundary
     * @param {Vector} norm boundary normal
     */
    constructor(pos, norm) {
        this.pos = pos
        this.norm = norm
    }
}

/**
 * Render to screen
 */
export default class Screen {
    constructor(ctx) {
        this.ctx = ctx
    }

    get X() {
        return this.ctx.canvas.width/2
    }

    get Y() {
        return this.ctx.canvas.height/2
    }

    get W() {
        return this.ctx.canvas.width;
    }

    get H() {
        return this.ctx.canvas.height;
    }

    get boundaries() {
        return [
            new Boundary(new Vector(0, this.Y), new Vector(0, -1)),
            new Boundary(new Vector(0, -this.Y), new Vector(0, 1)),
            new Boundary(new Vector(this.X, 0), new Vector(-1, 0)),
            new Boundary(new Vector(-this.X, 0), new Vector(1, 0))
        ]
    }

    get worldRect() {
        return new Rect(
            -this.X, this.X,
            -this.Y, this.Y
        )
    }

    centered(r) {
        return new Vector(this.X + r.x, this.Y - r.y)
    }

    clear() {
        this.ctx.clearRect(
            0, 0,
            this.ctx.canvas.width,
            this.ctx.canvas.height)
    }

    drawLine(p0, p1, color, width=1) {
        let t0 = this.centered(p0)
        let t1 = this.centered(p1)
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = width
        this.ctx.beginPath()
        this.ctx.moveTo(t0.x, t0.y)
        this.ctx.lineTo(t1.x, t1.y)
        this.ctx.stroke()    
    }

    drawRay(p, d, l, color, width=1) {
        let s = p.add(d.scale(l))
        this.drawLine(p, s, color, width)
    }

    drawCircle(pos, rad, color='#000000') {
        let trfp = this.centered(pos)
        this.ctx.fillStyle = color
        this.ctx.lineWidth = 1
        this.ctx.beginPath()
        this.ctx.arc(trfp.x, trfp.y, rad, 0, 2*Math.PI)
        this.ctx.fill()
    }

    drawRect(rect, color='#aaaaaa') {
        let c1 = this.centered(rect.pos0)
        let c2 = this.centered(rect.pos1)
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = 1
        this.ctx.beginPath()
        this.ctx.rect(c1.x, c1.y, c2.x - c1.x, c2.y - c1.y)
        this.ctx.stroke()
    }
}