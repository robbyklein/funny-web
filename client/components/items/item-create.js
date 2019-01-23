import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Layout, Header, Box, Section, Field } from '../shared'
import { setItemTags, createItem } from '../../actions/items'

export class ItemCreate extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createItem()
    }

    render() {
        const { tags, setItemTags } = this.props

        return (
            <form onSubmit={this.handleSubmit}>
                <Layout className="admin" sidebar={true}>
                    <Header>
                        <h2>New Item</h2>
                        <button
                            type="submit"
                            className="button xs right"
                            to="/admin/items/new"
                        >
                            Save
                        </button>
                    </Header>

                    <Section>
                        <Box>
                            <Field
                                onChange={setItemTags}
                                value={tags}
                                type="text"
                                label="Tags (Comma separated)"
                                id="tags"
                            />
                        </Box>
                    </Section>
                </Layout>
            </form>
        )
    }
}

function mapStateToProps({ items }) {
    return {
        tags: items.tags,
    }
}

export default connect(
    mapStateToProps,
    { setItemTags, createItem }
)(ItemCreate)
