import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

export class ItemsPagination extends Component {
    renderNext() {
        const { page, pages } = this.props
        if (page === pages) return ''

        const url = `/admin/items/page/${page + 1}`

        return (
            <li className="next">
                <Link to={url}>Next</Link>
            </li>
        )
    }

    renderPrev() {
        const { page, pages } = this.props
        if (page === 1) return ''

        const url = `/admin/items/page/${page - 1}`

        return (
            <li>
                <Link to={url}>Prev</Link>
            </li>
        )
    }

    render() {
        if (this.props.pages === 1) return ''

        return (
            <ul className="pagination">
                {this.renderPrev()}
                {this.renderNext()}
            </ul>
        )
    }
}

function mapStateToProps({ items }, { match }) {
    const page = Number(match.params.page) || 1
    return { pages: items.pages, page }
}

export default withRouter(connect(mapStateToProps)(ItemsPagination))
