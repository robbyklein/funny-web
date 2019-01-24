import axios from './axios'
import _ from 'lodash'
import { push } from 'connected-react-router'
import nanoid from 'nanoid'

import { setErrors } from './errors'
import { formData } from '../helpers'
import {
    FETCH_ITEMS,
    FETCH_ITEM,
    SET_ITEM_TAGS,
    SET_ITEM_PUBLISHED,
    SET_ITEM_SOURCE,
} from './types'

export const fetchItems = (page = 1) => {
    return async function(dispatch) {
        const url = `/admin-items?page=${page}`

        try {
            // Fetch items
            const res = await axios.get(url)

            // Process data
            const items = _.mapKeys(res.data.items, 'id')
            const { pages } = res.data

            // Put it in state
            dispatch({ type: FETCH_ITEMS, payload: { items, pages } })
        } catch (e) {
            dispatch(setErrors(['Invalid credentials.']))
        }
    }
}

export const fetchItem = id => {
    return async function(dispatch) {
        const url = `/admin-items/${id}`

        try {
            // Fetch item
            const res = await axios.get(url)

            // Extract item from response
            const { item } = res.data

            // Put it in state
            dispatch({ type: FETCH_ITEM, payload: item })
        } catch (e) {
            dispatch(setErrors(['Invalid credentials.']))
        }
    }
}

export const createItem = () => {
    return async function(dispatch, getState) {
        // Extract off state
        const { published, tags, source } = getState().items

        // Create a unique string identifier
        const iid = nanoid()

        try {
            // Required for upload
            const options = { headers: { 'content-type': 'multipart/form-data' } }

            // Create formdata for multipart
            const data = formData({ tags, published, iid, source })
            
            // Create item
            await axios.post('/items', data, options)

            // Redirect to index
            dispatch(push('/admin/items'))
        } catch (e) {
            dispatch(setErrors(['Invalid credentials.']))
        }
    }
}

export const editItem = id => {
    return async function(dispatch, getState) {
        const { published, tags, source, iid } = getState().items
    
        try {
            // Required for upload
            const options = { headers: { 'content-type': 'multipart/form-data' } }

            // Create formdata for multipart
            const data = formData({ tags, published, iid, source })

            // Update item
            const res = await axios.post(`/items/${id}`, data, options)

            // Redirect to index
            dispatch(push('/admin/items'))
        } catch (e) {
            dispatch(setErrors(['Invalid credentials.']))
        }
    }
}

export const setItemTags = payload => {
    return { type: SET_ITEM_TAGS, payload }
}

export const setItemPublished = () => {
    return { type: SET_ITEM_PUBLISHED }
}

export const setItemSource = payload => {
    return { type: SET_ITEM_SOURCE, payload }
}
