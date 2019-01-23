import { FETCH_ITEMS, SET_ITEM_TAGS, FETCH_ITEM } from '../actions/types'
import { LOCATION_CHANGE} from 'connected-react-router';

const defaultState = {
    pages: 1,
    items: {},
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
        case FETCH_ITEM:
            return {
                ...state,
                tags: action.payload.tags.join(', '),
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                }
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

export const selectItem = ({ items }, id) => {
    return items[id]
}