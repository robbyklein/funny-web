import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Field } from '../shared'
import { setItemTags, fetchItem, setItemPublished } from '../../actions/items'
import { selectItem } from '../../reducers/items'

export class ItemForm extends Component {
    componentDidMount() {
        const { id, item, fetchItem } = this.props
        if (id && !item) fetchItem(id)
    }

    render() {
        const { tags, setItemTags, published, setItemPublished } = this.props

        return (
            <Fragment>
                <Field
                    onChange={setItemTags}
                    value={tags}
                    type="text"
                    label="Tags (Comma separated)"
                    id="tags"
                />
                <Field
                    onChange={setItemPublished}
                    value={published}
                    type="checkbox"
                    label="Published"
                    id="published"
                />
            </Fragment>
        )
    }
}

function mapStateToProps({ items }, ownProps) {
    const { id } = ownProps.match.params

    return {
        id,
        item: selectItem(items, id),
        tags: items.tags,
        published: items.published,
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { setItemTags, fetchItem, setItemPublished }
    )(ItemForm)
)
