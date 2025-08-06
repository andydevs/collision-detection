/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */


export const msPerSec = 1000

export class Clock {
    constructor() {
        this.last = null
        this.time = Date.now()
    }

    tick() {
        this.last = this.time
        this.time = Date.now()
    }

    get delta() {
        return this.time - this.last
    }

    get deltaSeconds() {
        return this.delta / msPerSec
    }

    get framerate() {
        return Math.floor(1000 / this.delta)
    }
}