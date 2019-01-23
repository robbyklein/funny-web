import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { Layout, Header, Box, Section, Table, Row, Cell } from '../shared'
import { Pagination } from './'
import { fetchItems } from '../../actions/items'

class ItemsIndex extends Component {
    componentDidMount() {
        const { items, fetchItems, query } = this.props
        const { page } = queryString.parse(query)

        if (_.isEmpty(items)) fetchItems(page)
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
                <Row key={item.id} className="item">
                    <Cell className="flex">
                        <Link to={`/admin/items/${item.id}`}>{item.tags.join(', ')}</Link>
                    </Cell>
                    <Cell className="xs">{item.UserId}</Cell>
                    <Cell className="s right">
                        {item.published ? <i className="fas fa-check" /> : ''}
                    </Cell>
                </Row>
            )
        })
    }

    render() {
        return (
            <Layout className="admin" sidebar={true}>
                <Header>
                    <h2>Items</h2>
                    <Link className="button xs right" to="/admin/items/new">
                        New Item
                    </Link>
                </Header>

                <Section>
                    <Box>
                        <Table>
                            <Row className="head">
                                <Cell className="flex">Tags</Cell>
                                <Cell className="xs">User</Cell>
                                <Cell className="s right">Published</Cell>
                            </Row>
                            {this.renderItems()}
                        </Table>
                    </Box>

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
