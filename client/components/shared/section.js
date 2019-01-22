import React, { Component } from 'react'

export default class Section extends Component {
    render() {
        const { children, className } = this.props

        return <div className={`section ${className ? className : ''}`}>{children}</div>
    }
}
