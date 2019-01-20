import React, { Component } from 'react'
import { connect } from 'react-redux'

class Errors extends Component {
    render() {
        const { errors } = this.props
        if (!errors.length) return ''

        return (
            <div className="errors">
                <ul>
                    {errors.map((error, i) => {
                        return <li key={i}>{error}</li>
                    })}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ errors }) {
    return { errors }
}

export default connect(mapStateToProps)(Errors)
