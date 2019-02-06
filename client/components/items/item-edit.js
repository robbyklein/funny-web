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
        const { saving } = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                <Layout className="admin" sidebar={true}>
                    <Header>
                        <h2>Edit Item</h2>
                        <button
                            type="submit"
                            className="button xs right"
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save'}
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

function mapStateToProps({items}) {
    return { saving: items.saving }
}

export default withRouter(
    connect(
        mapStateToProps,
        { editItem }
    )(ItemEdit)
)
