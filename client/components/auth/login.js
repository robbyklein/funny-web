import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loginUser, setLoginEmail, setLoginPassword } from '../../actions/auth'
import { Layout, Box, Field, Button, Errors } from '../shared'
import { Logo } from '../svg'

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault()
        const { loginUser, email, password } = this.props
        loginUser(email, password)
    }

    render() {
        const { setLoginEmail, setLoginPassword, email, password } = this.props
        if (email == undefined || password == undefined) return ''

        return (
            <Layout className="auth-page login">
                <Link to="/" className="logo">
                    <Logo />
                </Link>
                <Box className="tiny">
                    <h2>Welcome back</h2>
                    <Errors />
                    <form onSubmit={this.handleSubmit}>
                        <Field
                            onChange={setLoginEmail}
                            type="text"
                            id="email"
                            value={email}
                            placeholder="Email Address"
                        />
                        <Field
                            onChange={setLoginPassword}
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Password"
                        />
                        <Field type="empty">
                            <Button type="submit" className="full">
                                Login
                            </Button>
                        </Field>
                    </form>
                </Box>
            </Layout>
        )
    }
}

function mapStateToProps({ auth: { loginEmail, loginPassword } }) {
    return {
        email: loginEmail,
        password: loginPassword,
    }
}

export default connect(
    mapStateToProps,
    { loginUser, setLoginEmail, setLoginPassword }
)(Login)
