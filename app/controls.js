/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

export class Controls {
    constructor() {
        this._numberBalls = document.querySelector('#number-balls')
        this._sizeBias = document.querySelector('#size-bias')
        this._generateButton = document.querySelector('#generate-balls')
        this._frameDeltaEntry = document.querySelector('#delta')
        this._framerateEntry = document.querySelector('#framerate')
        this._collisionCheck = document.querySelector('#show-collision')
        this._partitionCheck = document.querySelector('#show-partitions')
        this._partitionType = document.querySelector('#partition-type')
    }

    get showCollisions() {
        return this._collisionCheck.checked
    }

    get showPartitions() {
        return this._partitionCheck.checked
    }

    get partitionType() {
        return this._partitionType.value
    }

    get numberBalls() {
        return parseInt(this._numberBalls.value)
    }

    get sizeBias() {
        return parseFloat(this._sizeBias.value)
    }

    set frameDelta(value) {
        this._frameDeltaEntry.innerHTML = `${value}ms`
    }

    set framerate(value) {
        this._framerateEntry.innerHTML = `${value}`
    }

    onGenerate(callback) {
        this._generateButton.onclick = callback
        callback()
    }
}