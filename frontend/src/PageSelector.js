import React, { Component } from 'react';


export default class PageSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minPage: 0,
            maxPage: 5
        }
    }

    /* Mounting
     These methods are called when an instance of a component is being created and inserted into the DOM:
     * constructor()
     * componentWillMount()
     * render()
     * componentDidMount()
     */

    /* Updating
     An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
     * componentWillReceiveProps()
     * shouldComponentUpdate()
     * componentWillUpdate()
     * render()
     * componentDidUpdate()
     */

    componentWillReceiveProps() {
        if (this.props.currentPage < this.state.minPage) {
            this.setState({minPage: this.state.minPage - 5, maxPage: this.state.maxPage - 5})
        }
        else if (this.props.currentPage >= this.state.maxPage) {
            this.setState({minPage: this.state.minPage + 5, maxPage: this.state.maxPage + 5})
        }
    }

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    handleEllipsis(min, max) {
        this.setState({minPage: min, maxPage: max});
    }
    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

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