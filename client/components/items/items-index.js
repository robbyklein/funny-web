import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import _ from 'lodash'

import { Layout, Header, Box, Section, Table, Row, Cell } from '../shared'
import { ItemsPagination } from './'
import { fetchItems } from '../../actions/items'

class ItemsIndex extends Component {
    componentDidMount() {
        const { items, fetchItems, page } = this.props
        if (_.isEmpty(items)) fetchItems(page)
    }

    componentWillReceiveProps(nextProps) {
        const refetch = nextProps.page !== this.props.page
        if (refetch) nextProps.fetchItems(nextProps.page)
    }

    renderItems() {
        const { items } = this.props
        if (!items) return ''

        return _.map(items, item => {
            const tags = _.map(item.Tags, tag => tag.title)

            return (
                <Row key={item.id} className="item">
                    <Cell className="s">
                        <img className="item-image" src={item.source} />
                    </Cell>
                    <Cell className="flex">
                        <Link to={`/admin/items/${item.id}`}>{tags.length ? tags.join(', ') : 'Has no tags'}</Link>
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
                    <Box className="no-padding">
                        <Table className="items-table">
                            <Row className="head">
                                <Cell className="s"></Cell>
                                <Cell className="flex">Tags</Cell>
                                <Cell className="xs">User</Cell>
                                <Cell className="s right">Published</Cell>
                            </Row>
                            {this.renderItems()}
                        </Table>
                    </Box>

                    <ItemsPagination />
                </Section>
            </Layout>
        )
    }
}

function mapStateToProps({ items }, { match }) {
    const { page } = match.params

    return {
        items: items.items,
        pages: items.pages,
        page,
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { fetchItems }
    )(ItemsIndex)
)
