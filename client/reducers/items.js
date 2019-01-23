import { FETCH_ITEMS, SET_ITEM_TAGS } from '../actions/types'
import { LOCATION_CHANGE} from 'connected-react-router';

const defaultState = {
    pages: 1,
    items: false,
    tags: ''
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return defaultState
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload.items,
                pages: action.payload.pages
            }
        case SET_ITEM_TAGS:
            return {
                ...state,
                tags: action.payload
            }
        default:
            return state
    }
}