import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';
import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var blackStyles = {
    color: 'black'
}

var whiteStyles = {
    color: 'grey'
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
            count: 0,
            offenders: 0,
            victims: 0,
            pathname: "/Crimes",
            loading: true
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

    handleCount = (e) => {
        if (e != null) {
            this.setState({count: e.value})
        }
    }

    handleOffenders = (e) => {
        if (e != null) {
            this.setState({offenders: e.value})
        }
    }

    handleVictims = (e) => {
        if (e != null) {
            this.setState({victims: e.value})
        }
    }

    sort = (order) => {
        this.setState({sortBy: order})
    }

    callAPI = () => {

        let limit = this.state.pgSize
        let offset = this.state.page
        let limOff = "?limit="+limit+"&offset="+offset
        let url = "http://api.ontherun.me:5000/crimes" + limOff

        if (this.state.sortBy !== "") {
            url += "&sort="+this.state.sortBy
        }

        if (this.state.count !== 0) {
            url += "&count="+this.state.count
        }

        if (this.state.offenders !== 0) {
            url += "&offenders="+this.state.offenders
        }

        if (this.state.victims !== 0) {
            url += "&victims="+this.state.victims
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                console.log(res.data)
                console.log(res.data.totalCount)
                self.setState({crimes: res.data.crimes, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
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


    /* Unmounting
        This method is called when a component is being removed from the DOM:
            * componentWillUnmount()
     */

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {

    var Spinner = require('react-spinkit');
    if (this.state.loading) {
        return (
            <div className="container sub-container">
                <div className="row row-m-b">
                    <div className= "text-center">
                    <Spinner name = "wordpress" color="goldenrod"/>
                    </div>
                </div>
            </div>)
    }
    else {

        let crimeComponents = []
        let styleMenu = []
        if (this.state.crimes !== undefined) {
            // Create an array of X components with 1 for each beer gathered from API call
            crimeComponents = this.state.crimes.map((crime) => {
                return (
                    <ItemSelector item={crime} navigateTo="/Crime"/>
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
                                <Select name="form-field-name" value={this.state.count} onChange={this.handleCount} placeholder = "Filter by Number of Crimes"
                                options={[ { value: 5, label: '>5 offenses' }, { value: 500, label: '>500 offenses'}, { value: 1000, label: '>1,000 offenses'}, { value: 10000, label: '>10,000 offenses'},{ value: 50000, label: '>50,000 offenses'},
                                { value: 100000, label: '>100,000 offenses'},{ value: 500000, label: '>500,000 offenses'},]}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.offenders} onChange={this.handleOffenders} placeholder = "Filter by Number of Offenders"
                                options={[ { value: 10, label: '>10 offenders' }, { value: 100, label: '>100 Offenders'}, { value: 1000, label: '>1,000 offenders'}, { value: 10000, label: '>10,000 offenders'},{ value: 50000, label: '>50,000 offenders'},
                                { value: 100000, label: '>100,000 offenders'},{ value: 500000, label: '>500,000 offenders'},]}/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                                <Select name="form-field-name" value={this.state.victims} onChange={this.handleVictims} placeholder = "Filter by Number of Victims"
                                options={[ { value: 5, label: '>5 victims' }, { value: 100, label: '>100 victims'}, { value: 1000, label: '>1,000 victims'}, { value: 10000, label: '>10,000 victims'},{ value: 50000, label: '>50,000 victims'},
                                { value: 100000, label: '>100,000 victims'},{ value: 500000, label: '>500,000 victims'},]}/>
                            </div>
                        </div>
                </div>

                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(crimeComponents, 4).map((row) => {
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
                              navigateTo="/Crimes"/>}
            </div>
      );
    }
    }
}