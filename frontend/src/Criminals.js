import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';
import CriminalOverlay from './CriminalOverlay';
import Pagination from './Pagination';
import './font/css/font-awesome.min.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { Circle } from 'better-react-spinkit'
import {Row, Col, Panel, Button, Modal, Well} from 'react-bootstrap'

var blackStyles = {
    color: 'black'
}

var whiteStyles = {
    color: 'grey'
}

var containerStyle = {
    height: "80%",
    width: "80%"
}

var divStyle = {
    display: 'flex',
    justifyContent: 'center'
}

var wellStyle = {
  padding: "10px",
  margin: "10px",
  background: '#212529'
}

export default class Criminals extends Component {
    constructor (props) {
        super (props);
        this.state = {
            criminals: [],
            page: 0,
            numPages: 0,
            totalCount: 0,
            pgSize: 16,
            pathname: "/Criminals",
            sortBy: "",
            sex: "",
            race: "",
            height: {min: 50, max: 80},
            loading: true
        }
        //this.apiUrl = 'http://api.ontherun.me/criminals';
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

    handleSex = (e) => {
        if (e != null) {
            this.setState({sex: e.value})
        }
    }
    handleRace = (e) => {
        if (e != null) {
            this.setState({race: e.value})
        }
    }
    handleHeight = (value) => {
        this.setState({
          height_min: value
        })
    }

    sort(order) {
        this.setState({sortBy: order})
    }

    callAPI() {

        let limit = this.state.pgSize
        let offset = this.state.page
        let limOff = "?limit="+limit+"&offset="+offset
        let url = "http://api.ontherun.me/criminals" + limOff
        
        if (this.state.sortBy !== "") {
            url += "&sort="+this.state.sortBy
        }
        if (this.state.sex !== "" && this.state.sex !== "All") {
            url += "&sex=" + this.state.sex
        }
        if (this.state.race !== "" && this.state.race !== "All") {
            url += "&race=" + this.state.race
        }
        if (this.state.height.min !== 50 || this.state.height.max !== 80) {
            url += "&height_min=" + this.state.height.min + "&height_max=" + this.state.height.max 
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({criminals: res.data.results, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
                self.setState({loading: false})
                console.log(self.state.criminals)
                console.log(url)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.sortBy != this.state.sortBy ||
            prevState.sex != this.state.sex || 
            prevState.race != this.state.race || prevState.height != this.state.height) {
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
                <Circle size={250} color= "red"/>
            </div>)
    }
    else {

        let criminalComponents = []
        let styleMenu = []
        if (this.state.criminals !== undefined) {
            // Create an array of X components with 1 for each beer gathered from API call
            criminalComponents = this.state.criminals.map((criminal) => {
                return (
                    <CriminalOverlay item={criminal} navigateTo="/Criminal"/>
                );
            })
        }

        return (
            <div className="container sub-container">
                <Well style = {wellStyle}>
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
                        <Select name="form-field-name" value={this.state.sex} onChange={this.handleSex} placeholder= "Filter by Gender"
                        options={[ {value: 'All', label: 'All'}, { value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female'},]}/>
                        </div>
                    </div> 
                    <div className="col-md-3">
                        <div className = "text-left" style = {blackStyles}>
                        <Select name="form-field-name" value={this.state.race} onChange={this.handleRace} placeholder = "Filter by Race"
                        options={[ {value: 'All', label: 'All'}, { value: 'White', label: 'White' }, { value: 'Black', label: 'Black'}, { value: 'White (Hispanic)', label: 'White (Hispanic)'}, { value: 'Asian', label: 'Asian'}, 
                        { value: 'White (Central Asian)', label: 'White (Central Asian)'}, { value: 'Black (Hispanic)', label: 'Black (Hispanic)'}, { value: 'White (Middle Eastern)', label: 'White (Middle Eastern)'}, ]}/>
                        </div>
                    </div>    
                    <div className="col-md-3">
                        <div className = "text-center" style = {whiteStyles}>
                        <label> <strong> Filter by Height (Inches): </strong> </label>
                        <InputRange maxValue={80} minValue={50} value={this.state.height} onChange={height => this.setState({ height })} />
                        </div>
                    </div>
                </div>
                </Well>
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(criminalComponents, 4).map((row) => {
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
                              navigateTo="/Criminals"/>}
            </div>
      );
    }
    }
}