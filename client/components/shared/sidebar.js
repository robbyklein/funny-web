import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Logo } from '../svg'
import { logoutUser } from '../../actions/auth'

class Sidebar extends Component {
    state = {
        open: false,
    }

    toggle = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    render() {
        const { path } = this.props

        return (
            <div className={`sidebar ${this.state.open ? 'nav-active' : ''}`}>
                <h1 className="logo">
                    <Link to="/"><Logo width={140} light={true} /></Link>
                </h1>

                <button onClick={this.toggle} className="hamburger">
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                </button>

                <ul className="nav">
                    <li className={path === '/admin' ? 'active' : ''}>
                        <Link to="/admin">
                            <i className="fas fa-tachometer-alt" />
                            Dashboard
                        </Link>
                    </li>
                    <li className={path === '/admin/items' ? 'active' : ''}>
                        <Link to="/admin/items">
                            <i className="fas fa-list-ul" />
                            Items
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/logout">
                            <i className="fas fa-sign-out-alt" />
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ router: { location } }) {
    return {
        path: location.pathname,
    }
}

export default connect(
    mapStateToProps,
    { logoutUser }
)(Sidebar)
