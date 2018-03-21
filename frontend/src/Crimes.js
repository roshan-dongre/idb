import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';

import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';


export default class Crimes extends Component {
    constructor (props) {
        super (props);
        this.state = {
            crimes: [],
            allStates: [],
            allCriminals: [],
            selectedState: "",
            selectedCriminal: "",
            page: 0,
            numPages: 0,
            totalCount: 0,
            pageLimit: 16,
            sortBy: "",
            pathname: "/Crimes"
        }
        this.apiUrl = 'http://api.ontherun.me:5000/crimes';
    }

    /* Mounting
        These methods are called when an instance of a component is being created and inserted into the DOM:
            * constructor()
            * componentWillMount()
            * render()
            * componentDidMount()
     */

    componentDidMount () {
        this.callAPI()
        this.getStatesCriminals()
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

    handleCriminal = (e) => {
        this.setState({selectedCriminal: e.target.value})
    }

    handleState = (e) => {
        this.setState({selectedState: e.target.value})
    }

    sort = (order) => {
        this.setState({sortBy: order})
    }

    callAPI = () => {

        // let limit = this.state.pageLimit
        // let offset = this.state.page * this.state.pageLimit
        // let limOff = "?limit="+limit+"&offset="+offset
        
        let url = "http://api.ontherun.me:5000/crimes"

        if (this.state.selectedState !== "All" && this.state.selectedState !== "") {
            url += "&state="+this.state.selectedState
        }
        if (this.state.selectedCriminal !== "All" && this.state.selectedCriminal !== "") {
            url += "&criminal="+this.state.selectedCriminal
        }
        if (this.state.sortBy !== "") {
            url += "&sort_by="+this.state.sortBy
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({crimes: res.data.records, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pageLimit)});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getStatesCriminals = () => {
        let url = 'http://api.ontherun.me:5000/crimes';
        let states = new Set([])
        let criminals = new Set([])

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with names of styles
                res.data.records.forEach((crime) => {
                    states.add(crime.state);
                    criminals.add(crime.criminal)
                })
                states = ['All',...Array.from(states).sort()]
                criminals = ['All',...Array.from(criminals).sort()]
                self.setState({allStates: states, allCriminals: criminals});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    /* Updating
        An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
            * componentWillReceiveProps()
            * shouldComponentUpdate()
            * componentWillUpdate()
            * render()
            * componentDidUpdate()
     */

    componentDidUpdate(prevProps, prevState) {

        if (prevState.selectedState !== this.state.selectedState ||
            prevState.selectedCriminal !== this.state.selectedCriminal ||
            prevState.sortBy !== this.state.sortBy ||
            prevState.page !== this.state.page)
        {
            this.callAPI()
        }

        if (prevState.page !== this.state.page) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    /* Unmounting
        This method is called when a component is being removed from the DOM:
            * componentWillUnmount()
     */

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */
    render () {
        let stateMenu = []
        let criminalMenu = []

        // Create an array of X components with 1 for each crime gathered from API call
        let crimeComponents = this.state.crimes.map(function(crime) {
                return (
                    <ItemSelector item={crime} navigateTo="/Crimes"/>
                );
            })

        if (this.state.allCriminals !== undefined) {
            stateMenu = this.state.allStates.map((criminal) => {
                return (
                    <option value={criminal}>{criminal}</option>
                );
            })
        }

        if (this.state.allStates !== undefined) {
            criminalMenu = this.state.allCriminals.map((state) => {
                return (
                    <option value={state}>{state}</option>
                );
            })
        }

        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="button btn-group">
                            <button type="button"
                                    className={this.state.order === "asc" ? "btn btn-default active" : "btn btn-default"}
                                    onClick={(e) => this.sort("asc", e)}><i className="fa fa-sort-alpha-asc" aria-hidden="true"/></button>
                            <button type="button"
                                    className={this.state.order === "desc" ? "btn btn-default active" : "btn btn-default"}
                                    onClick={(e) => this.sort("desc", e)}><i className="fa fa-sort-alpha-desc" aria-hidden="true"/></button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label>
                            <strong>criminal:  </strong>

                        </label><span> </span>
                        <select value={this.state.selectedCriminal} onChange={this.handlecriminal}>
                                {criminalMenu}
                            </select>
                    </div>
                    <div className="col-md-4">
                        <label>
                            <strong>State:  </strong>
                        </label><span> </span>
                        <select value={this.state.selectedState} onChange={this.handleState}>
                                {stateMenu}
                            </select>
                    </div>
                </div>
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(crimeComponents, 4).map(function(row) {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                <PageSelector handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              currentPage={this.state.page}
                              navigateTo="/Crimes"/>
            </div>
        );
    }
}