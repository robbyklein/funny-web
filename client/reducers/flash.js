import { CLEAR_FLASH, SET_FLASH } from '../actions/types'

const defaultState = {
    message: '',
    active: false
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case SET_FLASH:
            return {
                ...state,
                active: true,
                message: action.payload
            }
        case CLEAR_FLASH:
            return {
                ...state,
                active: false
            }
        default:
            return state
    }
}