import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import chunk from 'lodash.chunk';
import SearchItem from './SearchItem';
import Pagination from './Pagination';

import Highlighter from 'react-highlight-words'

class SearchResults extends Component {
    constructor (props) {
        super (props);
        let results = this.props.location.state.results === "Error" ? "Error" : chunk(this.props.location.state.results, 10)

        this.state = {
            results: results,
            page: 0,
            numPages: Math.ceil(this.props.location.state.results.length/10),
            totalResults: this.props.location.state.results.length,
            pageSize: 10,
            queryPhrase: this.props.location.state.queryPhrase,
            pathname: "/SearchResults"
        }
        this.contextTypes = {
            router: () => true, 
        }
    }

    handlePageChange = (page, e) => {
        e.preventDefault()
        //return <Redirect to={{pathname: this.state.pathname, state: {page: page}}} push={true} />;
        this.setState({page: page})
    }

    handlePrev = (e) => {
        e.preventDefault()
        if (this.state.page > 0) {
            this.setState({page: this.state.page - 1})
        }
    }

    handleNext = (e) => {
        e.preventDefault()
        if (this.state.page < this.state.numPages - 1) {
            this.setState({page: this.state.page + 1})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.state.queryPhrase !== this.props.location.state.queryPhrase ||
            nextProps.location.state.results !== this.props.location.state.results) {
            this.setState({
                queryPhrase: nextProps.location.state.queryPhrase,
                results: chunk(nextProps.location.state.results, 10),
                numPages: Math.ceil(nextProps.location.state.results.length/10),
                totalResults: nextProps.location.state.results.length,
                page: 0
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }


    render() {
        
        // if (this.state.results != "") {
        //     this.changeValues()
        // }

        console.log(this.state.results)
        console.log(this.state.results[0])
        console.log(this.state.results[1])
        if (this.state.results.length === 0) {
            return (<div className="container sub-container" style={{height: 100}}>
                        <div className="mh-50">
                            <div className="col-12">
                                <h3>No available results</h3>
                            </div>
                            <div className="row align-items-center">
                                <button className="btn btn-link"
                                        onClick={this.props.history.goBack}>Return</button>
                            </div>
                        </div>
                    </div>);
        } else if (this.state.results === "Error") {
            return (<div className="container sub-container" style={{height: 100}}>
                <div className="mh-50">
                    <div className="col-12">
                        <h3> Error! Please search again.</h3>
                    </div>
                    <div className="row align-items-center">
                        <button className="btn btn-link"
                                onClick={this.props.history.return}>Return</button>
                    </div>
                </div>
            </div>);
        }
        let queryPhrase = this.state.queryPhrase
        let resultRows = this.state.results[this.state.page].map((result) => {
            return (
                <SearchItem key={result.id} item={result} queryPhrase={queryPhrase} navigateTo="/Result"/>
            );
        })
        console.log(resultRows)

        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-xs-12">
                        <h2 className="sub-header">Search Results</h2>
                        <div>
                            <h4 style={{display: 'inline'}}>Showing:</h4>
                                <strong> {this.state.page*this.state.pageSize + 1}</strong> -
                                <strong>{this.state.page*this.state.pageSize + 10 < this.state.totalResults ? this.state.page*this.state.pageSize + 10 : this.state.totalResults}</strong> of
                                <strong> {this.state.totalResults}</strong> results
                        </div>
                        <table className="table table-responsive">
                            <tbody>
                            {resultRows}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination handlePageChange={this.handlePageChange}
                                handlePrev={this.handlePrev}
                                handleNext={this.handleNext}
                                numPages={this.state.numPages}
                                currentPage={this.state.page}
                                navigateTo="/SearchResults"/>
            </div>
        );
    }
}

export default withRouter(SearchResults);