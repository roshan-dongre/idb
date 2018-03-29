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
            page: 0,
            numPages: 0,
            totalCount: 0,
            pgSize: 16,
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

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                console.log(res.data)
                console.log(res.data.totalCount)
                self.setState({crimes: res.data.crimes, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
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

        if (prevState.sortBy != this.state.sortBy) {
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
                            <div className= "text-left">
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

                        {/*
                        <div className="col-md-3">
                            <div className = "text-left" style = {blackStyles}>
                            <label>
                                <strong style = {whiteStyles}>Gender:  </strong>
                            </label><span> </span>
                            <select value={this.state.sex} onChange={this.handleSex}>
                                    <option value="Unknown"> None </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label>
                                <strong>Style:  </strong>
                            </label><span> </span>
                            <select value={this.state.style} onChange={this.handleStyle}>
                                    {styleMenu}
                            </select>
                        </div>
                        */}

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