import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../index'

import { Home } from './home'
import { Login, Logout, RequireAuth } from './auth'
import { Admin } from './admin'
import { AdminItems } from './adminItems'

export default class App extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    {/* Pages */}
                    <Route exact path="/" component={Home} />

                    {/* Authentication */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />

                    {/* Admin */}
                    <Route exact path="/admin" component={RequireAuth(Admin)} />
                    <Route exact path="/admin/items" component={RequireAuth(AdminItems)} />

                </Switch>
            </ConnectedRouter>
        )
    }
}
