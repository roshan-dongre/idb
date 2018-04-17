import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';
import ModelOverlay from './ModelOverlay';
import Pagination from './Pagination';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { Circle } from 'better-react-spinkit'
import './Crimes.css'
import {Row, Col, Panel, Button, Modal, Well} from 'react-bootstrap'

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
  background: '#353b48'
}

export default class Crimes extends Component {
    constructor (props) {
        super (props);
        this.state = {
            crimes: [],
            page: 0,
            numPages: 0,
            totalCount: 0,
            pgSize: 16,
            sortBy: "",
            count: {min: 0, max: 750},
            offenders: {min: 0, max: 750},
            victims: {min: 0, max: 750},
            pathname: "/Crimes",
            loading: true
        }
        //this.apiUrl = 'http://api.ontherun.me/crimes';
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

    sort(order) {
        this.setState({sortBy: order})
    }

    callAPI() {

        let limit = this.state.pgSize
        let offset = this.state.page
        let limOff = "?limit="+limit+"&offset="+offset
        let url = "http://api.ontherun.me:5000/crimes" + limOff

        if (this.state.sortBy !== "") {
            url += "&sort="+this.state.sortBy
        }

        if (this.state.count.min !== 0 || this.state.count.max !== 750) {
            url += "&count_min=" + (this.state.count.min * 1000) + "&count_max=" + (this.state.count.max * 1000)
        }
        if (this.state.offenders.min !== 0 || this.state.offenders.max !== 750) {
            url += "&offenders_min=" + (this.state.offenders.min * 1000) + "&offenders_max=" + (this.state.offenders.max * 1000)
        }
        if (this.state.victims.min !== 0 || this.state.victims.max !== 750) {
            url += "&victims_min=" + (this.state.victims.min * 1000) + "&victims_max=" + (this.state.victims.max * 1000)
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                console.log(res.data)
                console.log(res.data.totalCount)
                self.setState({crimes: res.data.results, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
                self.setState({loading: false})
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
            prevState.count != this.state.count ||
            prevState.offenders != this.state.offenders ||
            prevState.victims != this.state.victims) {
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
                <Circle size={250} color= "goldenrod"/>
            </div>)
    }
    else {

        let crimeComponents = []
        let styleMenu = []
        if (this.state.crimes !== undefined) {
            // Create an array of X components with 1 for each beer gathered from API call
            crimeComponents = this.state.crimes.map((crime) => {
                return (
                    <ModelOverlay item={crime} navigateTo="/Crime"/>
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
                                    <div className = "text-center" style = {whiteStyles}>
                                        <label> <strong> Filter by Number of Crimes (M): </strong> </label>
                                        <InputRange maxValue={750} minValue={0} value={this.state.count} onChange={count => this.setState({ count })} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className = "text-center" style = {whiteStyles}>
                                        <label> <strong> Filter by Number of Offenders (M): </strong> </label>
                                        <InputRange maxValue={750} minValue={0} value={this.state.offenders} onChange={offenders => this.setState({ offenders })} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className = "text-center" style = {whiteStyles}>
                                        <label> <strong> Filter by Number of Victims (M): </strong> </label>
                                        <InputRange maxValue={750} minValue={0} value={this.state.victims} onChange={victims => this.setState({ victims })} />
                                    </div>
                                </div>
                        </div>
                    </Well>
                    {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                    { chunk(crimeComponents, 4).map((row) => {
                        return (
                            <div className="row row-striped">
                                { row }
                            </div>
                        )
                    })}
                    {<Pagination handlePageChange={this.handlePageChange}
                                  handlePrev={this.handlePrev}
                                  handleNext={this.handleNext}
                                  numPages={this.state.numPages}
                                  currentPage={this.state.page}
                                  navigateTo="/Crimes"/>}
                </div>
      );
    }
    }
}