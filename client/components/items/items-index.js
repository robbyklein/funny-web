import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Layout, Header } from '../shared'
import { fetchItems } from '../../actions/items'

class ItemsIndex extends Component {
    componentDidMount() {
        const { items, fetchItems } = this.props
        if (!items) fetchItems()
    }

    renderItems() {
        const { items } = this.props

        console.log(items)

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
        items: items.items,
        pages: items.pages
    }
}

export default connect(
    mapStateToProps,
    { fetchItems }
)(ItemsIndex)
