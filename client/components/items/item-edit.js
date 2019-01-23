import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Layout, Header, Box, Section } from '../shared'
import { ItemForm } from './'
import { editItem } from '../../actions/items'

export class ItemEdit extends Component {
    handleSubmit = e => {
        e.preventDefault()
        const {match, editItem} = this.props
        editItem(match.params.id)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Layout className="admin" sidebar={true}>
                    <Header>
                        <h2>Edit Item</h2>
                        <button type="submit" className="button xs right">
                            Save
                        </button>
                    </Header>

                    <Section>
                        <Box>
                            <ItemForm />
                        </Box>
                    </Section>
                </Layout>
            </form>
        )
    }
}

export default withRouter(
    connect(
        null,
        { editItem }
    )(ItemEdit)
)
