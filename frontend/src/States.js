import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';
import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';
import './font/css/font-awesome.min.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { Circle } from 'better-react-spinkit'

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
            population: {min: 0, max: 200},
            area: {min: 0, max: 200},
            pathname: "/States",
            loading: true
        }
        //this.apiUrl = 'http://api.ontherun.me:5000/states';
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

    handleRegion = (e) => {
        if (e != null) {
            this.setState({region: e.value})
        }
    }

    /*handlePopulation = (e) => {
        if (e != null) {
            this.setState({population: e.value})
        }
    }

    handleArea = (e) => {
        if (e != null) {
            this.setState({area: e.value})
        }
    }*/

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

        if (this.state.population.min !== 0 || this.state.population.max !== 200) {
            url += "&population_min=" + (this.state.population.min * 100000) + "&population_max=" + (this.state.population.max * 100000)
        }

        if (this.state.area.min !== 0 || this.state.area.max !== 200) {
            url += "&area_min=" + (this.state.area.min * 1000) + "&area_max=" + (this.state.area.max * 1000)
        }

        /*if (this.state.population !== 0) {
            url += "&population=" + this.state.population
        }

        if (this.state.area !== 0) {
            url += "&area=" + this.state.area
        }*/

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({states: res.data.results, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
                self.setState({loading: false})
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


    if (this.state.loading) {
        return (
            <div className="container sub-container">
                <div className="row row-m-b">
                    <div className="col-md-3">
                        <p>   </p>
                    </div>
                    <div className= "col-md-3">
                        <Circle size={250} color= "green"/>
                    </div>
                    <div className= "col-md-3">
                        <p>   </p>
                    </div>
                </div>
            </div>)
    }
    else {


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
                        {/*<div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.population} onChange={this.handlePopulation} placeholder = "Filter by Population"
                                options={[ { value: 500000, label: '>500,000 People' }, { value: 1000000, label: '>1,000,000 People'}, { value: 2000000, label: '>2,000,000 People'}, { value: 5000000, label: '>5,000,000 People'},{ value: 10000000, label: '>10,000,000 People'},]}/>
                            </div>
                        </div> 
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.area} onChange={this.handleArea} placeholder = "Filter by Area"
                                options={[ { value: 50, label: '>50 Square Miles' }, { value: 5000, label: '>5,000 Square Miles'}, { value: 25000, label: '>25,000 Square Miles'}, { value: 50000, label: '>50,000 Square Miles'},{ value: 100000, label: '>100,000 Square Miles'},]}/>
                            </div>
                        </div>*/}
                        <div className="col-md-3">
                            <div className = "text-center" style = {whiteStyles}>
                                <label> <strong> Filter by Population (MM People): </strong> </label>
                                <InputRange maxValue={200} minValue={0} value={this.state.population} onChange={population => this.setState({ population })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className = "text-center" style = {whiteStyles}>
                                <label> <strong> Filter by Area (MM Sq. Miles): </strong> </label>
                                <InputRange maxValue={200} minValue={0} value={this.state.area} onChange={area => this.setState({ area })} />
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
}