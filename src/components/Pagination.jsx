import React, { Component } from 'react'

export default class Pagination extends Component {
    render(props) {
        return (
            <nav aria-label="..." className="col-2" >
            <ul className="pagination ">
                {
                    this.props.pageNumberArr.map((pageNumber) => {
                        let additional = pageNumber === this.props.currentPage ? "page-item active" : "page-item";
                        return (
                            <li className={additional}
                                 key={pageNumber}
                                aria-current="page" onClick={() => { this.props.changeCurrentPage(pageNumber) }}>
                                <span className="page-link">{pageNumber}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
        )
    }
}
