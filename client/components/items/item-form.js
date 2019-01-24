import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Field } from '../shared'
import { setItemTags, fetchItem, setItemPublished, setItemSource } from '../../actions/items'
import { selectItem } from '../../reducers/items'

export class ItemForm extends Component {
    componentDidMount() {
        const { id, item, fetchItem } = this.props
        if (id && !item) fetchItem(id)
    }

    asd = (e, a) => {
        this.props.setItemSource(e.target.files[0])
    }

    render() {
        const { tags, setItemTags, published, setItemPublished, source, setItemSource } = this.props

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
                <input id="source" type="file" onChange={this.asd} />
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
        { setItemTags, fetchItem, setItemPublished, setItemSource }
    )(ItemForm)
)
