/**
 * Collision detection
 * 
 * Author:  Anshul Kharbanda
 * Created: 4 - 30 - 2021
 */
import { Observable } from "rxjs";


/**
 * Map input stats to display element
 * 
 * @param {{ [K in string]: Observable }} mapping object connecting input to element 
 * 
 * @returns {() => void} function which unsubscribes from all stats
 */
export function hookStats(mapping) {
    let subscriptions = Object.entries(mapping).map(([id, observable$]) => {
        return observable$.subscribe((value) => {
            document.querySelector(id).innerHTML = `${value}`
        })
    })
    return () => {
        subscriptions.map(s => s.unsubscribe())
    }
}