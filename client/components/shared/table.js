import React, { Component } from 'react'

export default class Table extends Component {
    render() {
        const { children, className } = this.props

        return <div className={`table ${className ? className : ''}`}>{children}</div>
    }
}
