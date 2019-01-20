import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        const { children, className, ...rest } = this.props
        
        return (
            <button className={`button ${className}`} {...rest}>
                {children}
            </button>
        )
    }
}
