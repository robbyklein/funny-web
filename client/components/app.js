import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from '../admin'

import { Login, Logout, RequireAuth } from './auth'
import { Dashboard } from './dashboard'
import { ItemsIndex, ItemCreate, ItemEdit } from './items'

export default class App extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    {/* Authentication */}
                    <Route exact path="/admin/login" component={Login} />
                    <Route exact path="/admin/logout" component={Logout} />

                    {/* Admin */}
                    <Route exact path="/admin" component={RequireAuth(Dashboard)} />
                    <Route exact path="/admin/items" component={RequireAuth(ItemsIndex)} />
                    <Route exact path="/admin/items/page/:page" component={RequireAuth(ItemsIndex)} />
                    <Route exact path="/admin/items/new" component={RequireAuth(ItemCreate)} />
                    <Route exact path="/admin/items/:id" component={RequireAuth(ItemEdit)} />



                </Switch>
            </ConnectedRouter>
        )
    }
}
