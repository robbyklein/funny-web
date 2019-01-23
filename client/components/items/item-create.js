import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Layout, Header, Box, Section, Field } from '../shared'
import { setItemTags, createItem } from '../../actions/items'
import { ItemForm } from './';

export class ItemCreate extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createItem()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Layout className="admin" sidebar={true}>
                    <Header>
                        <h2>New Item</h2>
                        <button
                            type="submit"
                            className="button xs right"
                        >
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

export default connect(
    null,
    { createItem }
)(ItemCreate)
