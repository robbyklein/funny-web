import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import './scss/admin.scss'
import reducers from './reducers'
import App from './components/app'
import { decodeToken } from './helpers'

window['__react-beautiful-dnd-disable-dev-warnings'] = true

const token = localStorage.getItem('auth')

let preloadedState = {
    auth: {},
}

if (token) {
    try {
        preloadedState.auth = decodeToken(token)
    } catch (err) {
        localStorage.removeItem('token')
    }
}

// Create Store
export const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    reducers(history),
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), ReduxThunk))
)

// Render App
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)

export default store
