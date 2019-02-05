import {
    FETCH_ITEMS,
    SET_ITEM_TAGS,
    FETCH_ITEM,
    SET_ITEM_PUBLISHED,
    SET_ITEM_SOURCE,
    SET_ITEM_BLOB,
    SET_ITEM_SRC,
    SET_ITEM_CROP,
    SET_ITEM_CROP_IMAGE_URL,
} from '../actions/types'
import { LOCATION_CHANGE } from 'connected-react-router'

const defaultState = {
    pages: 1,
    items: {},
    iid: '',
    tags: '',
    published: false,
    source: null,
    blob: null,
    src: null,
    crop: {
        x: 0,
        y: 0,
    },
    cropImageUrl: null,
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return defaultState
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload.items,
                pages: action.payload.pages,
            }
        case FETCH_ITEM:
            return {
                ...state,
                tags: _.map(action.payload.Tags, t => t.title).join(', '),
                published: action.payload.published,
                iid: action.payload.iid,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload,
                },
            }
        case SET_ITEM_TAGS:
            return {
                ...state,
                tags: action.payload,
            }
        case SET_ITEM_PUBLISHED:
            return {
                ...state,
                published: !state.published,
            }
        case SET_ITEM_SOURCE:
            return {
                ...state,
                source: action.payload,
            }
        case SET_ITEM_BLOB:
            return {
                ...state,
                blob: action.payload,
            }
        case SET_ITEM_SRC:
            return {
                ...state,
                src: action.payload,
            }
        case SET_ITEM_CROP:
            return {
                ...state,
                crop: action.payload,
            }
        case SET_ITEM_CROP_IMAGE_URL:
            return {
                ...state,
                cropImageUrl: action.payload,
            }
        default:
            return state
    }
}

export const selectItem = ({ items }, id) => {
    return items[id]
}
