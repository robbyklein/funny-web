import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logoutUser } from '../../actions/auth'
import { Layout, Box } from '../shared'
import { Logo } from '../svg'

class Logout extends Component {
    componentDidMount() {
        this.props.logoutUser()
    }

    render() {
        return (
            <Layout className="auth-page login">
                <Link to="/" className="logo">
                    <Logo />
                </Link>
                <Box>
                    <h2>Bye</h2>
                    <p>See you next time.</p>
                </Box>
            </Layout>
        )
    }
}

export default connect(
    null,
    { logoutUser }
)(Logout)
