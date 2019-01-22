import axios from './axios'
import _ from 'lodash'

import { FETCH_ITEMS } from './types'

export const fetchItems = () => {
    return async function(dispatch, getState) {
        const { page } = getState().items
        const url = `/admin/items?page=${page}`

        try {
            // Fetch items
            const res = await axios.get(url)

            // Process data
            const items = _.mapKeys(res.data.items, 'id')
            const ids = _.map(res.data.items, 'id')
            const { hasNext } = res.data

            // Put it in state
            dispatch({
                type: FETCH_ITEMS,
                payload: { items, ids, hasNext }
            })
        } catch (e) {
            dispatch(setErrors(['Invalid credentials.']))
        }
    }
}
