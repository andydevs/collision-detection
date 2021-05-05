/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import Vector from './vector'

export default class Screen {
    constructor(elemid) {
        this.canvas = document.getElementById(elemid)
        this.ctx = canvas.getContext('2d')
        this.origin = new Vector(
            this.canvas.width/2, 
            this.canvas.height/2)
    }

    get X() {
        return this.canvas.width/2
    }

    get Y() {
        return this.canvas.height/2
    }

    centered(r) {
        return new Vector(
            this.origin.x + r.x, 
            this.origin.y - r.y)
    }

    clear() {
        this.ctx.clearRect(
            0, 0,
            this.canvas.width,
            this.canvas.height)
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
}