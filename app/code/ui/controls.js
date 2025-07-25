/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

export class Controls {
    static storageKey = 'addvscd-setting-state'

    constructor() {
        console.groupCollapsed('new Controls')
        this._frameDeltaEntry = document.querySelector('#delta')
        this._framerateEntry = document.querySelector('#framerate')
        this._cpsEntry = document.querySelector('#cps')
        this._numberBalls = document.querySelector('#number-balls')
        this._sizeBias = document.querySelector('#size-bias')
        this._generateButton = document.querySelector('#generate-balls')
        this._collisionCheck = document.querySelector('#show-collision')
        this._partitionCheck = document.querySelector('#show-partitions')
        this._partitionType = document.querySelector('#partition-type')

        // Load from localstorage
        this.loadStorage()
        this.initializeSaveStorageCallback()
    }

    loadStorage() {
        // Load from localstorage
        console.log('Checking localstorage for', Controls.storageKey)
        let savedStateJSON = localStorage.getItem(Controls.storageKey)
        if (savedStateJSON) {
            console.log('Loaded data from state')
            console.log(savedStateJSON)
            console.log('Parsing data')
            let savedState = JSON.parse(savedStateJSON)
            console.log(savedState)
            this._numberBalls.value = savedState.numberBalls
            this._sizeBias.value = savedState.sizeBias
            this._collisionCheck.checked = savedState.collisionCheck
            this._partitionCheck.checked = savedState.partitionCheck
            this._partitionType.value = savedState.partitionType
        }
        console.groupEnd()
    }

    initializeSaveStorageCallback() {
        let inputs = [
            this._numberBalls,
            this._sizeBias,
            this._generateButton,
            this._collisionCheck,
            this._partitionCheck,
            this._partitionType
        ]
        for (const inp of inputs) {
            inp.addEventListener('change', this.saveStorage.bind(this))
        }
    }

    saveStorage() {
        console.groupCollapsed('saveStorage')
        let saveState = {
            numberBalls: this._numberBalls.value,
            sizeBias: this._sizeBias.value,
            collisionCheck: this._collisionCheck.checked,
            partitionCheck: this._partitionCheck.checked,
            partitionType: this._partitionType.value
        }
        console.log('State being saved')
        console.log(saveState)
        console.log('Saving to json')
        let saveStateJSON = JSON.stringify(saveState)
        console.log(saveStateJSON)
        console.log('Setting to stoage key:', Controls.storageKey)
        localStorage.setItem(Controls.storageKey, saveStateJSON)
        console.groupEnd()
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

    set cps(value) {
        this._cpsEntry.innerHTML = `${value}`
    }

    onGenerate(callback) {
        this._generateButton.onclick = callback
        callback()
    }
}