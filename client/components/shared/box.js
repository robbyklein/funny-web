import React, { Component } from 'react'

export default class Box extends Component {
    render() {
        const { children, className } = this.props

        return <div className={`box ${className ? className : ''}`}>{children}</div>
    }
}
