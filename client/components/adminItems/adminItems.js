import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Layout, Header } from '../shared'
import { fetchItems } from '../../actions/items'

class AdminItems extends Component {
    componentDidMount() {
        const { ids, fetchItems } = this.props
        if (!ids.length) fetchItems()
    }

    renderItems() {
        const { items } = this.props
        if (!items) return ''

        return _.map(items, item => {
            return (
                <div key={item.id} className="item">
                    <div>{item.published}</div>
                    <div>{item.tags}</div>
                    <div>{item.UserId}</div>
                </div>
            )
        })
    }

    render() {
        return (
            <Layout className="admin" sidebar={true}>
                <Header>
                    <h2>Items</h2>
                </Header>

                {this.renderItems()}
            </Layout>
        )
    }
}

function mapStateToProps({ items }) {
    return {
        items: items.data,
        ids: items.ids
    }
}

export default connect(
    mapStateToProps,
    { fetchItems }
)(AdminItems)
