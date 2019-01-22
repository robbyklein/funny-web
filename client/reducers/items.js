import { FETCH_ITEMS } from '../actions/types'

const defaultState = {
    hasNext: true,
    page: 1,
    data: {},
    ids: []
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                data: action.payload.items,
                ids: action.payload.ids,
                hasNext: action.payload.hasNext
            }
        default:
            return state
    }
}