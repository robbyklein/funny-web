import React, { Component } from 'react'

export default class Box extends Component {
    render() {
        const { size, children, className } = this.props

        return <div className={`box ${size} ${className}`}>{children}</div>
    }
}
