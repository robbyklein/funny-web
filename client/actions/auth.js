import axios from './axios'
import { push } from 'connected-react-router'

import { setErrors } from './errors'
import decodeToken from '../helpers/decode-token'
import { LOGIN, LOGOUT, SET_LOGIN_EMAIL, SET_LOGIN_PASSWORD } from './types'

export const loginUser = (email, password) => {
    return async function(dispatch) {
        try {
            const res = await axios.post('/login', { email, password })
            const { auth_token } = res.data

            localStorage.setItem('auth_token', auth_token)
            axios.defaults.headers['auth_token'] = auth_token

            dispatch({ type: LOGIN, payload: decodeToken(auth_token) })
            dispatch(push('/admin'))
        } catch (e) {
            dispatch(setErrors(['Invalid credentials.']))
        }
    }
}

export const logoutUser = () => {
    return async function(dispatch) {
        localStorage.removeItem('auth_token')
        axios.defaults.headers['auth_token'] = null

        dispatch({ type: LOGOUT })
        dispatch(push('/login'))
    }
}

export const setLoginEmail = payload => {
    return { type: SET_LOGIN_EMAIL, payload }
}

export const setLoginPassword = payload => {
    return { type: SET_LOGIN_PASSWORD, payload }
}
