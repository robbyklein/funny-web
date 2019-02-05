import { LOCATION_CHANGE } from 'connected-react-router'

import {
    LOGIN,
    LOGOUT,
    SET_LOGIN_EMAIL,
    SET_LOGIN_PASSWORD
} from '../actions/types'

const defaultState = {
    loginEmail: '',
    loginPassword: '',
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                ...defaultState
            }
        case LOGIN:
            return {
                ...state,
                auth: action.payload.auth,
                admin: action.payload.admin,
                name: action.payload.name,
                email: action.payload.email,
            }
        case LOGOUT:
            return defaultState
        case SET_LOGIN_EMAIL:
            return {
                ...state,
                loginEmail: action.payload,
            }
        case SET_LOGIN_PASSWORD:
            return {
                ...state,
                loginPassword: action.payload,
            }
        default:
            return state
    }
}
