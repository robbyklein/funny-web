import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import { Layout, Header, Box, Section } from '../shared'
import { Pagination } from './'
import { fetchItems } from '../../actions/items'

class ItemsIndex extends Component {
    componentDidMount() {
        const { items, fetchItems, query } = this.props
        const { page } = queryString.parse(query)

        if (!items) fetchItems(page)
    }

    componentWillReceiveProps(nextProps) {
        const refetch = nextProps.query !== this.props.query
        
        if (refetch) {
            const { page } = queryString.parse(nextProps.query)
            nextProps.fetchItems(page)
        }
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
                    <Link className="button xs right" to="/admin/items/new">New Item</Link>
                </Header>

                <Section>
                    <Box>{this.renderItems()}</Box>

                    <Pagination />
                </Section>
            </Layout>
        )
    }
}

function mapStateToProps({ items, router }) {
    return {
        items: items.items,
        pages: items.pages,
        query: router.location.search,
    }
}

export default connect(
    mapStateToProps,
    { fetchItems }
)(ItemsIndex)
