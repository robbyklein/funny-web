import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Field } from '../shared'
import { setItemTags, fetchItem } from '../../actions/items'
import { selectItem } from '../../reducers/items'

export class ItemForm extends Component {
    componentDidMount() {
        const { id, item, fetchItem } = this.props
        if (id && !item) fetchItem(id)
    }

    render() {
        const { tags, setItemTags } = this.props

        return (
            <Field
                onChange={setItemTags}
                value={tags}
                type="text"
                label="Tags (Comma separated)"
                id="tags"
            />
        )
    }
}

function mapStateToProps({ items }, ownProps) {
    const { id } = ownProps.match.params

    return {
        id,
        item: selectItem(items, id),
        tags: items.tags,
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { setItemTags, fetchItem }
    )(ItemForm)
)
