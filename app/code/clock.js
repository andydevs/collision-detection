/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

import { Subject } from "rxjs"


export const msPerSec = 1000

export class Clock {
    constructor() {
        this.last = null
        this.time = Date.now()
        this.ticks$ = new Subject()
    }

    tick() {
        this.last = this.time
        this.time = Date.now()
        this.ticks$.next({ delta: this.delta })
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