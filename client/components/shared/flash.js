import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Flash extends Component {
    render() {
        const { message, active } = this.props

        return (
            <div className={`flash ${active ? 'active' : ''}`}>
                <p>{message}</p>
            </div>
        )
    }
}

function mapStateToProps({ flash: { message, active } }) {
    return { message, active }
}

export default connect(mapStateToProps)(Flash)
