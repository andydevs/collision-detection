/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */


export class Stats {
    constructor() {
        this._frameDeltaEntry = document.querySelector('#delta')
        this._framerateEntry = document.querySelector('#framerate')
        this._cpsEntry = document.querySelector('#cps')
    }

    set frameDelta(value) {
        this._frameDeltaEntry.innerHTML = `${value}ms`
    }

    set framerate(value) {
        this._framerateEntry.innerHTML = `${value}`
    }

    set cps(value) {
        this._cpsEntry.innerHTML = `${value}`
    }
}