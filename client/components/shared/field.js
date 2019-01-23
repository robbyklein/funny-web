import React, { Component, forwardRef } from 'react'

export default class Field extends Component {
    onChange = e => {
        const { value } = e.target
        const { onChange } = this.props
        onChange(value)
    }

    render() {
        const { type, label, id, children, value, placeholder } = this.props

        if (type === 'textarea') {
            return (
                <div className={`field ${type}`}>
                    {!label ? '' : <label htmlFor={id}>{label}</label>}
                    <textarea
                        id={id}
                        onChange={this.onChange}
                        placeholder={placeholder}
                        value={value}
                    />
                </div>
            )
        } else if (type === 'empty') {
            return <div className={`field ${type}`}>{children}</div>
        } else if (type === 'select') {
            return (
                <div className={`field ${type}`}>
                    {!label ? '' : <label htmlFor={id}>{label}</label>}
                    <select id={id} onChange={this.onChange} value={value}>
                        {children}
                    </select>
                </div>
            )
        } else if (type === 'checkbox') {
            return (
                <div className={`field ${type}`}>
                    <input
                        id={id}
                        onChange={this.onChange}
                        type="checkbox"
                        value={value}
                        checked={value}
                    />
                    {!label ? '' : <label htmlFor={id}>{label}</label>}
                </div>
            )
        }

        return (
            <div className={`field ${type}`}>
                {!label ? '' : <label htmlFor={id}>{label}</label>}123
                <input
                    id={id}
                    type={type}
                    onChange={this.onChange}
                    placeholder={placeholder}
                    value={value}
                />
            </div>
        )
    }
}
