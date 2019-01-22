import axios from './axios'
import _ from 'lodash'

import {setErrors} from './errors'
import { FETCH_ITEMS } from './types'

export const fetchItems = (page = 1) => {
    return async function(dispatch) {
        const url = `/admin/items?page=${page}`

        try {
            // Fetch items
            const res = await axios.get(url)

            // Process data
            const items = _.mapKeys(res.data.items, 'id')
            const { pages } = res.data

            // Put it in state
            dispatch({
                type: FETCH_ITEMS,
                payload: { items, pages },
            })
        } catch (e) {
            dispatch(setErrors(['Invalid credentials.']))
        }
    }
}
