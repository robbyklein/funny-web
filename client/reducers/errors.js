import { CLEAR_ERRORS, SET_ERRORS } from '../actions/types'
import { LOCATION_CHANGE} from 'connected-react-router';

export default function(state = [], action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return []
        case SET_ERRORS:
            return action.payload
        case CLEAR_ERRORS:
            return []
        default:
            return state
    }
}