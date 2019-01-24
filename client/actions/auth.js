import axios from './axios'
import { push } from 'connected-react-router'

import { setErrors } from './errors'
import decodeToken from '../helpers/decode-token'
import { LOGIN, LOGOUT, SET_LOGIN_EMAIL, SET_LOGIN_PASSWORD } from './types'

export const loginUser = (email, password) => {
    return async function(dispatch) {
        try {
            // Fetch auth token
            const res = await axios.post('/login', { email, password })
            const { auth } = res.data

            // Set it to local storage
            localStorage.setItem('auth', auth)

            // Set as header on axios instance
            axios.defaults.headers['auth'] = auth

            // Decode and set in state
            dispatch({ type: LOGIN, payload: decodeToken(auth) })

            // Redirect to admin dashboard
            dispatch(push('/admin'))
        } catch (e) {
            dispatch(setErrors(['Invalid credentials.']))
        }
    }
}

export const logoutUser = () => {
    return async function(dispatch) {
        // Remove from local storage
        localStorage.removeItem('auth')

        // Remove as header from axios instance
        axios.defaults.headers['auth'] = null

        // Remove from state
        dispatch({ type: LOGOUT })

        // Redirect to login page
        dispatch(push('/admin/login'))
    }
}

export const setLoginEmail = payload => {
    return { type: SET_LOGIN_EMAIL, payload }
}

export const setLoginPassword = payload => {
    return { type: SET_LOGIN_PASSWORD, payload }
}
