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
    color: 'white'
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
            sex: ""
        }
        this.apiUrl = 'http://api.ontherun.me:5000/criminals';
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

    handleSex = (e) => {
        if (e != null) {
            this.setState({sex: e.value})
        }
    }

    sort = (order) => {
        this.setState({sortBy: order})
    }

    callAPI = () => {

        let limit = this.state.pgSize
        let offset = this.state.page
        let limOff = "?limit="+limit+"&offset="+offset
        let url = "http://api.ontherun.me:5000/criminals" + limOff

        if (this.state.sortBy !== "") {
            url += "&sort="+this.state.sortBy
        }
        if (this.state.sex !== "") {
            url += "&sex=" + this.state.sex
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({criminals: res.data.criminals, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
                console.log(self.state.criminals)
                console.log(url)
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
            prevState.sex != this.state.sex) {
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

        let criminalComponents = []
        let styleMenu = []
        if (this.state.criminals !== undefined) {
            // Create an array of X components with 1 for each beer gathered from API call
            criminalComponents = this.state.criminals.map((criminal) => {
                return (
                    <ItemSelector item={criminal} navigateTo="/Criminal"/>
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
                    <div className="col-md-3">
                        <div className = "text-left" style = {blackStyles}>
                        <Select name="form-field-name" value={this.state.sex} onChange={this.handleSex}
                        options={[ { value: 'Male', label: 'Male', clearableValue: false }, { value: 'Female', label: 'Female', clearableValue: false },]}/>
                        </div>
                    </div>          
                </div>
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(criminalComponents, 4).map((row) => {
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
                              navigateTo="/Criminals"/>}
            </div>
      );
    }
}