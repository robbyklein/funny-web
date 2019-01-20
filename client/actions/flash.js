import { CLEAR_FLASH, SET_FLASH } from './types'

export const setFlash = message => {
    return function(dispatch) {
        // Clear old timeout
        if (window.flashTimeout) clearTimeout(window.flashTimeout)

        // Set a new flash
        dispatch({ type: SET_FLASH, payload: message })

        // Set a new timeout
        window.flashTimeout = setTimeout(() => {
            dispatch({ type: CLEAR_FLASH })
        }, 3000)
    }
}