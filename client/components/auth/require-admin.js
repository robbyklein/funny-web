import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

export default ChildComponent => {
    class ComposedComponent extends Component {
        shouldNavigateAway() {
            const { auth, role, push } = this.props
            if (!auth || role < 99) push('/login')
        }

        // Our component just got rendered
        componentDidMount() {
            this.shouldNavigateAway()
        }

        // Our component just got updated
        componentDidUpdate() {
            this.shouldNavigateAway()
        }

        render() {
            return <ChildComponent {...this.props} />
        }
    }

    function mapStateToProps({ auth: { auth, role } }) {
        return { auth, role }
    }

    return connect(mapStateToProps, { push })(ComposedComponent)
}
