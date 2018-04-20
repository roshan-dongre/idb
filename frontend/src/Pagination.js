import React, { Component } from 'react';

/*Handles the Pagination for the frontend grid pages */
export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minPage: 0,
            maxPage: 5
        }
    }

    /*Props method for updating pages */
    componentWillReceiveProps() {
        if (this.props.currentPage < this.state.minPage) {
            this.setState({minPage: this.state.minPage - 5, maxPage: this.state.maxPage - 5})
        }
        else if (this.props.currentPage >= this.state.maxPage) {
            this.setState({minPage: this.state.minPage + 5, maxPage: this.state.maxPage + 5})
        }
    }

    /*Creates the ellipisis */
    handleEllipsis(min, max) {
        this.setState({minPage: min, maxPage: max});
    }

    /*Render actually showing the pagination bar */

    render() {
        let pageNumbers = []
        let pageCount

        for (let i = this.state.minPage; i < this.props.numPages && i < this.state.maxPage; i++) {
            if (i === this.state.minPage && this.state.minPage !== 0) {
                pageNumbers.push(
                    <li>
                        <a key={i} onClick={(e) => this.handleEllipsis(this.state.minPage - 5, this.state.maxPage - 5)}>...</a>
                    </li>);
            }
            pageNumbers.push(
                <li key={i} className={i === this.props.currentPage ? "active" : ""}>
                    <a href={this.props.navigateTo}
                       onClick={(e) => this.props.handlePageChange(i, e)}>{i+1}</a>
                </li>);
            if (i === this.state.maxPage - 1) {
                pageNumbers.push(
                    <li>
                        <a key={i} onClick={(e) => this.handleEllipsis(this.state.minPage + 5, this.state.maxPage + 5)}>...</a>
                    </li>);
            }
        }

        pageCount = this.props.numPages === 0 ?
                    <div>No pages available</div> :
                    <div>Page {this.props.currentPage + 1} of {this.props.numPages} pages</div>

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center">
                        {pageCount}
                        <ul className="pagination pagination-lg">
                            <li><a href={this.props.navigateTo} onClick={(e) => this.props.handlePrev(e)}>Prev</a></li>
                            {pageNumbers}
                            <li><a href={this.props.navigateTo} onClick={(e) => this.props.handleNext(e)}>Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}