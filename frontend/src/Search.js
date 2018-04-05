import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: this.props.allData,
            results: [],
            searchKeys: [],
            searchTerm: "",
            totalCount: 0,
            numPages: 0,
            pgSize: 9,
            loading: false,
            navigate: false
        }
        this.apiUrl = 'http://api.ontherun.me:5000/';
        let criminalKeys = ["name", "dob", "sex", "eyes", "hair", "height", "race", "nationality", "crime"]
        let stateKeys = ["name", "abbreviation", "capital", "flower", "field_offices", "area", "population", "density", "region"]
        let crimeKeys = ["name", "description", "count", "offenders", "victims"]
        this.allKeys = criminalKeys.concat(stateKeys).concat(crimeKeys)
    }

    handleSearch = (e) => {
        e.preventDefault()
        //console.log(this)
        //this.refs.loader.style = "display: block";
        this.setState({ searchTerm: this.input.value });
        this.searchData(this.input.value)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.allData !== this.props.allData) {
            this.setState({
                allData: nextProps.allData
            });
        }
    }

    searchData = (searchTerm) => {
        let result
        let options = {
            shouldSort: true,
            threshold: 0.2,
            maxLen: 16,
            minLen: 1,
            keys: this.allKeys
        };
        if (this.state.allData.length === 0) {
            result = "Error"
        } else {
            let fuse = new Fuse(this.state.allData, options);
            result = fuse.search(searchTerm);
        }
        
        this.setState({ results: result, navigate: true, loading: false });
    }

    render() {

        if (this.state.navigate) {
            this.setState({navigate: false})
            return <Redirect to={{pathname: '/SearchResults', state: {results: this.state.results, searchTerm: this.state.searchTerm}}} push={true} />;
        }
        return (
            <form className="navbar-form navbar-right" onSubmit={this.handleSearch}>
                <div className="form-group search-bar">
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Search"
                               aria-label="Search"
                               ref={(element) => { this.input = element }} />
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit">
                                    <i className="glyphicon glyphicon-search"/>
                                </button>
                            </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(Search);