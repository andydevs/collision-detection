/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */

/**
 * Handles partition strategy selector
 */
export class LegacyPartitionControl {
    constructor(options) {
        // ==> here we create options based on the strategy. 
        //      we'll also create a map between the id and strategy
        this._selectorElement = document.querySelector('#partition-type')
        this._options = options
        Object.entries(this._options).forEach(([key, { display }]) => {
            let option = document.createElement('option')
            option.setAttribute('value', key)
            option.textContent = display;
            this._selectorElement.appendChild(option)
        })
    }

    get value() {
        return this._selectorElement.value
    }

    get func() {
        return this._options[this.value].func
    }
}

export class LegacyControls {
    static storageKey = 'addvscd-setting-state'

    constructor(partitionControl) {
        this._numberBalls = document.querySelector('#number-balls')
        this._sizeBias = document.querySelector('#size-bias')
        this._generateButton = document.querySelector('#generate-balls')
        this._collisionCheck = document.querySelector('#show-collision')
        this._partitionCheck = document.querySelector('#show-partitions')
        this._partitionControl = partitionControl

        // Load from localstorage
        this.loadStorage()
        this.initializeSaveStorageCallback()
    }

    loadStorage() {
        // Load from localstorage
        console.groupCollapsed('Load config from local storage')
        console.log('Checking localstorage for', LegacyControls.storageKey)
        let savedStateJSON = localStorage.getItem(LegacyControls.storageKey)
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
            this._partitionControl._selectorElement.value = savedState.partitionType
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
            this._partitionControl._selectorElement
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
            partitionType: this._partitionControl.value
        }
        console.log('State being saved')
        console.log(saveState)
        console.log('Saving to json')
        let saveStateJSON = JSON.stringify(saveState)
        console.log(saveStateJSON)
        console.log('Setting to stoage key:', LegacyControls.storageKey)
        localStorage.setItem(LegacyControls.storageKey, saveStateJSON)
        console.groupEnd()
    }

    get showCollisions() {
        return this._collisionCheck.checked
    }

    get showPartitions() {
        return this._partitionCheck.checked
    }

    get partitionType() {
        return this._partitionControl.value
    }

    get numberBalls() {
        return parseInt(this._numberBalls.value)
    }

    get sizeBias() {
        return parseFloat(this._sizeBias.value)
    }

    onGenerate(callback) {
        this._generateButton.onclick = callback
        callback()
    }
}