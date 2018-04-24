import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';
import StateOverlay from './StateOverlay';
import Pagination from './Pagination';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { Circle } from 'better-react-spinkit'
import {Row, Col, Panel, Button, Modal, Well, Alert} from 'react-bootstrap'

var blackStyles = {
    color: 'black'
}

var whiteStyles = {
    color: 'grey'
}

var divStyle = {
    display: 'flex',
    justifyContent: 'center'
}

var wellStyle = {
  padding: "10px",
  margin: "10px",
  background: '#2C3A47'
}

export default class States extends Component {
    constructor (props) {
        super (props);
        this.state = {
            states: [],
            page: 0,
            numPages: 0,
            totalCount: 0,
            pgSize: 16,
            sortBy: "",
            region: "",
            population: "default",
            area: "default",
            pathname: "/States",
            loading: true
        }
    }

    componentDidMount () {
        this.callAPI()
    }

    handlePageChange = (page, e) => {
        e.preventDefault()
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

    handleSort = (e) => {
         if (e != null) {
            this.setState({sortBy: e.value})
        }
    }

    handleRegion = (e) => {
        if (e != null) {
            this.setState({region: e.value})
        }
    }

    handlePopulation = (e) => {
        if (e != null) {
            this.setState({population: e.value})
        }
    }

    handleArea = (e) => {
        if (e != null) {
            this.setState({area: e.value})
        }
    }

    callAPI() {

        let limit = this.state.pgSize
        let offset = this.state.page
        let limOff = "?limit="+limit+"&offset="+offset
        let url = "http://api.ontherun.me/states" + limOff
        //let url = "http://18.219.198.152/states" + limOff

        if (this.state.sortBy !== "" && this.state.sortBy !== "all") {
            if (this.state.sortBy === 'name-asc' || this.state.sortBy === 'name-desc'){
                if (this.state.sortBy === 'name-asc') {
                    url += "&sort_name="+"ASC"
                } else {
                    url += "&sort_name="+"DESC"
                }
            }
            if (this.state.sortBy === 'area-asc' || this.state.sortBy === 'area-desc'){
                if (this.state.sortBy === 'area-asc') {
                    url += "&sort_area="+"ASC"
                } else {
                    url += "&sort_area="+"DESC"
                }
            }
        }

        if (this.state.region !== "" && this.state.region !== "All") {
            url += "&region=" + this.state.region
        }

        if (this.state.population !== "default") {
            var min = 0
            var max = 100000000
            if (this.state.population === "tiny") {
                max = 999999
            }
            if (this.state.population === "small") {
                min = 1000000
                max = 2999999
            }
            if (this.state.population === "medium") {
                min = 3000000
                max = 4999999
            }
            if (this.state.population === "large") {
                min = 5000000
                max = 9999999
            }
            if (this.state.population === "giant") {
                min = 10000000
            }

            url += "&population_min=" + min + "&population_max=" + max
        }

        if (this.state.area !== "default") {
            var min = 0
            var max = 700000
            if (this.state.area === "tiny") {
                max = 9999
            }
            if (this.state.area === "small") {
                min = 10000
                max = 49999
            }
            if (this.state.area === "medium") {
                min = 50000
                max = 69999
            }
            if (this.state.area === "large") {
                min = 70000
                max = 99999
            }
            if (this.state.area === "giant") {
                min = 100000
            }

            url += "&area_min=" + min + "&area_max=" + max
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({states: res.data.results, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
                self.setState({loading: false})
                // console.log(res.data.states.length)
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

        if (prevState.sortBy != this.state.sortBy ||
            prevState.region != this.state.region || 
            prevState.population != this.state.population
            || prevState.area != this.state.area) {
            this.callAPI()
        }


        if (prevState.page !== this.state.page) {
            this.callAPI()
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    render() {

    if (this.state.loading) {
        return (
            <div className="container sub-container" style={divStyle}>
                <Circle size={250} color= "blue"/>
            </div>)
    }
    else {


        let stateComponents = []
        let styleMenu = []
        if (this.state.states !== undefined) {
            // Create an array of X components with 1 for each beer gathered from API call
            stateComponents = this.state.states.map((state) => {
                return (
                    <StateOverlay item={state} navigateTo="/State"/>
                );
            })
        }


        return (
            <div className="container sub-container">
                <Alert bsStyle="warning">
                  <strong>Note!</strong> K stands for thousands, and M stands for millions!
                </Alert>
                <Well style = {wellStyle}>
                    <div className="row row-m-b">
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.sortBy} onChange={this.handleSort} placeholder= "Sort by Name or Area"
                                options={[ {value: 'all', label: 'No Sorting'}, {value: 'name-asc', label: 'Sort by Name (ASC)'}, { value: 'name-desc', label: 'Sort by Name (DESC)' }, { value: 'area-asc', label: 'Sort by Area (ASC)'},{ value: 'area-desc', label: 'Sort by Area (DESC)'},]}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.region} onChange={this.handleRegion} placeholder = "Filter by Region"
                                options={[ {value: 'All', label: 'All'}, { value: 'Northeast', label: 'Northeast' }, { value: 'Midwest', label: 'Midwest'}, { value: 'South', label: 'South'}, { value: 'West', label: 'West'},]}/>
                            </div>
                        </div> 
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.population} onChange={this.handlePopulation} placeholder = "Filter by Population"
                                options={[ { value: 'all', label: 'All' },{ value: 'tiny', label: 'Tiny Population (P < 1M)' }, { value: 'small', label: 'Small Population (1M <= P < 3M)'}, { value: 'medium', label: 'Medium Population (3M <= P < 5M)'}, { value: 'large', label: 'Large Population (5M <= P < 10M)'},{ value: 'giant', label: 'Giant Population (P >= 10M)'},]}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.area} onChange={this.handleArea} placeholder = "Filter by Area (Sq. Miles)"
                                options={[ { value: 'all', label: 'All' },{ value: 'tiny', label: 'Tiny Area (A < 10K)' }, { value: 'small', label: 'Small Area (10K <= A < 50K)'}, { value: 'medium', label: 'Medium Area (50K <= A < 70K)'}, { value: 'large', label: 'Large Area (70K <= A < 100K)'},{ value: 'giant', label: 'Giant Area (A >= 100K)'},]}/>
                            </div>
                        </div>   
                    
                    </div>
                </Well>

                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(stateComponents, 4).map((row) => {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                {<Pagination handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              currentPage={this.state.page}
                              navigateTo="/States"/>}
            </div>
      );
    }
    }
}