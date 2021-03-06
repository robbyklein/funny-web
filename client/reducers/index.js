import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './auth'
import errors from './errors'
import flash from './flash'
import items from './items'

export default history => {
    return combineReducers({
        router: connectRouter(history),
        auth,
        errors,
        flash,
        items
    })
}
