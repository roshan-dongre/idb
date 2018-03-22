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

    callAPI = () => {

        // let limit = this.state.pageLimit
        // let offset = this.state.page * this.state.pageLimit
        // let limOff = "?limit="+limit+"&offset="+offset
        
        let url = "http://api.ontherun.me:5000/crimes"

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({crimes: res.data.crimes, totalCount: res.data.crimes.length, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
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
     
        let styleMenu = []
        let crimeComponents = []
        // Create an array of X components with 1 for each crime gathered from API call
        crimeComponents = this.state.crimes.map(function(crime) {
                return (
                    <ItemSelector item={crime} navigateTo="/Crimes"/>
                );
            })

        if (this.state.crimes !== undefined) {
            // Create an array of X components with 1 for each beer gathered from API call
            crimeComponents = this.state.crimes.map((crime) => {
                return (
                    <ItemSelector item={crime} navigateTo="/Crimes"/>
                );
            })
        }

        return (
            <div className="container sub-container">
                
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(crimeComponents, 4).map(function(row) {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                {/*<PageSelector handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              currentPage={this.state.page}
                              navigateTo="/Crimes"/>*/}
            </div>
        );
    }
}