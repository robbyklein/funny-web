import React, { Component } from 'react'

export default class Cell extends Component {
    render() {
        const { children, className } = this.props

        return <div className={`cell ${className ? className : ''}`}><span className="cell-content">{children}</span></div>
    }
}
