import { FETCH_ITEMS, SET_ITEM_TAGS, FETCH_ITEM, SET_ITEM_PUBLISHED } from '../actions/types'
import { LOCATION_CHANGE} from 'connected-react-router';

const defaultState = {
    pages: 1,
    items: {},
    tags: '',
    published: false
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
                published: action.payload.published,
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
        case SET_ITEM_PUBLISHED:
            return {
                ...state,
                published: !state.published
            }
        default:
            return state
    }
}

export const selectItem = ({ items }, id) => {
    return items[id]
}