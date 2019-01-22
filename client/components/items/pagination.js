import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

export class Pagination extends Component {    
    renderNext() {
        const { page, pages } = this.props
        if (page === pages) return ''
        
        const url = `/admin/items?page=${page + 1}`

        return (
            <li><Link to={url}>Next</Link></li>
        )
    }

    renderPrev() {
        const { page, pages } = this.props
        if (page === 1) return ''

        const url = `/admin/items?page=${page - 1}`

        return (
            <li><Link to={url}>Prev</Link></li>
        )
    }

    render() {
        if (this.props.pages === 1) return ''

        return (
            <ul className="pagination">
                {this.renderNext()}
                {this.renderPrev()}

            </ul>
        )
    }
}

function mapStateToProps({ items, router }) {
    const page = queryString.parse(router.location.search).page || 1
    return { pages: items.pages, page: Number(page) }
}

export default connect(mapStateToProps)(Pagination)
