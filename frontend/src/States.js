import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';
import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';
import './font/css/font-awesome.min.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var blackStyles = {
    color: 'black'
}

var whiteStyles = {
    color: 'grey'
}

export default class Criminals extends Component {
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
            population: 0,
            area: 0,
            pathname: "/States"
        }
        this.apiUrl = 'http://api.ontherun.me:5000/states';
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

    sort = (order) => {
        this.setState({sortBy: order})
    }

    callAPI = () => {

        let limit = this.state.pgSize
        let offset = this.state.page
        let limOff = "?limit="+limit+"&offset="+offset
        let url = "http://api.ontherun.me:5000/states" + limOff

        if (this.state.sortBy !== "") {
            url += "&sort="+this.state.sortBy
        }

        if (this.state.region !== "") {
            url += "&region=" + this.state.region
        }

        if (this.state.population !== 0) {
            url += "&population=" + this.state.population
        }

        if (this.state.area !== 0) {
            url += "&area=" + this.state.area
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({states: res.data.states, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
                console.log(res.data.states.length)
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


    /* Unmounting
        This method is called when a component is being removed from the DOM:
            * componentWillUnmount()
     */

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {

        let stateComponents = []
        let styleMenu = []
        if (this.state.states !== undefined) {
            // Create an array of X components with 1 for each beer gathered from API call
            stateComponents = this.state.states.map((state) => {
                return (
                    <ItemSelector item={state} navigateTo="/State"/>
                );
            })
        }


        return (
            <div className="container sub-container">


                <div className="row row-m-b">
                        <div className="col-md-3">
                            <div className= "text-center">
                            <label>
                                <strong style = {whiteStyles}>Sort by Name:  &nbsp;&nbsp;</strong>
                            </label><span> </span>
                            <div className="button btn-group">
                                <button type="button"
                                      className={this.state.order === "ASC" ? "btn btn-default active" : "btn btn-default"}
                                      onClick={(e) => this.sort("ASC", e)}><i className="fa fa-sort-alpha-asc" aria-hidden="true"/></button>
                                <button type="button"
                                      className={this.state.order === "DESC" ? "btn btn-default active" : "btn btn-default"}
                                      onClick={(e) => this.sort("DESC", e)}><i className="fa fa-sort-alpha-desc" aria-hidden="true"/></button>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.region} onChange={this.handleRegion} placeholder = "Filter by Region"
                                options={[ { value: 'Northeast', label: 'Northeast' }, { value: 'Midwest', label: 'Midwest'}, { value: 'South', label: 'South'}, { value: 'West', label: 'West'},]}/>
                            </div>
                        </div> 
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.population} onChange={this.handlePopulation} placeholder = "Filter by Population"
                                options={[ { value: 500000, label: '>500,000 people' }, { value: 1000000, label: '>1,000,000 people'}, { value: 2000000, label: '>2,000,000 people'}, { value: 5000000, label: '>5,000,000 people'},{ value: 10000000, label: '>10,000,000 people'},]}/>
                            </div>
                        </div> 
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.area} onChange={this.handleArea} placeholder = "Filter by Area"
                                options={[ { value: 50, label: '>50 square miles' }, { value: 5000, label: '>5,000 square miles'}, { value: 25000, label: '>25,000 square miles'}, { value: 50000, label: '>50,000 square miles'},{ value: 100000, label: '>100,000 square miles'},]}/>
                            </div>
                        </div>
                </div>

                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(stateComponents, 4).map((row) => {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                {<PageSelector handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              currentPage={this.state.page}
                              navigateTo="/States"/>}
            </div>
      );
    }
}