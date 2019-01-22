import { FETCH_ITEMS } from '../actions/types'

const defaultState = {
    pages: 1,
    items: false,
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload.items,
                pages: action.payload.pages
            }
        default:
            return state
    }
}