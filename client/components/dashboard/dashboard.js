import React, { Component } from 'react'

import { Layout, Header } from '../shared'

export default class Login extends Component {
    render() {
        return (
            <Layout className="admin" sidebar={true}>
                <Header>
                    <h2>Dashboard</h2>
                </Header>
            </Layout>
        )
    }
}