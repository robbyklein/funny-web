import React, { Component } from 'react'

import { Layout, Header } from '../shared'

export default class AdminItems extends Component {
    render() {
        return (
            <Layout className="admin" sidebar={true}>
                <Header>
                    <h2>Items</h2>
                </Header>
            </Layout>
        )
    }
}