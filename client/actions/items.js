import axios from './axios'
import _ from 'lodash'
import { push } from 'connected-react-router'

import { setErrors } from './errors'
import { FETCH_ITEMS, FETCH_ITEM, SET_ITEM_TAGS, SET_ITEM_PUBLISHED } from './types'

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
        const {
            items,
            items: { published },
        } = getState()

        // Comma separated values to array
        const tagsString = items.tags
        const tags = tagsString
            .trim()
            .replace(/ +(?= )/g, '')
            .match(/[^,\s][^\,]*[^,\s]*/g)

        try {
            // POST item to server
            const res = await axios.post('/items', { tags, published })

            // Redirect to index
            dispatch(push('/admin/items'))
        } catch (e) {
            dispatch(setErrors(['Invalid credentials.']))
        }
    }
}

export const editItem = id => {
    return async function(dispatch, getState) {
        // Comma separated
        const tagsString = getState().items.tags
        const tags = tagsString
            .trim()
            .replace(/ +(?= )/g, '')
            .match(/[^,\s][^\,]*[^,\s]*/g)

        try {
            // Update item
            const res = await axios.put(`/items/${id}`, { tags })

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
