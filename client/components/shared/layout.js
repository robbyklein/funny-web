import React, { Component } from 'react'

import { Sidebar, Flash } from './index'

export default class Layout extends Component {
    render() {
        const { sidebar, className, children } = this.props

        return (
            <div className={className}>
                {sidebar ? <Sidebar /> : ''}
                <main className="main">{children}</main>
                <Flash />
            </div>
        )
    }
}
