import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';
import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';

export default class Criminals extends Component {
    constructor (props) {
        super (props);
        this.state = {
            states: [],
            page: 0,
            numPages: 0,
            totalCount: 0,
            pgSize: 16,
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

    callAPI = () => {

        //let limit = this.state.pgSize
        //let offset = this.state.page * this.state.pgSize
        //let limOff = "?limit="+limit+"&offset="+offset
        let url = "http://api.ontherun.me:5000/states"

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({states: res.data.states, totalCount: res.data.states.length, numPages: Math.ceil(res.data.states.length/self.state.pgSize)});
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
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(stateComponents, 4).map((row) => {
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
                              navigateTo="/Criminals"/>*/}
            </div>
      );
    }
}