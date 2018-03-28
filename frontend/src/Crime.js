import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

var imageStyles = {
    width: '400px',
    height: '350px'
}

export default class Crime extends Component {
    constructor (props) {
        super (props);
        let item = "";
        if ('location' in this.props  && this.props.location.state.item !== undefined) {
            item = this.props.location.state.item
        } else if (this.props.item !== undefined) {
            item = this.props.item
        }
        this.state = {
            item: item,
            selectedId: "",
            navigate: false,
            navigateTo: "",
            states: [],
            criminals: []
        }
    }

    /* Mounting
     These methods are called when an instance of a component is being created and inserted into the DOM:
     * constructor()
     * componentWillMount()
     * render()
     * componentDidMount()
     */

    componentDidMount() {
        this.callAPI()
        this.getStates()
        this.getCriminals()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.item.name !== this.state.item.name)
        {
            this.getStates()
            this.getCriminals()
        }
    }

    /* Updating
     An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
     * componentWillReceiveProps()
     * shouldComponentUpdate()
     * componentWillUpdate()
     * render()
     * componentDidUpdate()
     */

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    getStates = () => {
        let url = "http://api.ontherun.me:5000/crimestostate/" + this.state.item.id
        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({states: res.data});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getCriminals = () => {
        if (this.state.item.id !== undefined) {
        let url = "http://api.ontherun.me:5000/crimetocriminals/" + this.state.item.id
        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({criminals: res.data});
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }

    handleCriminalNavigation = (criminalId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            selectedId: criminalId,
            navigateTo: "/Criminal"
        })
    }

    handleStateNavigation = (stateId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            selectedId: stateId,
            navigateTo: "/State" 
        })
    }

    callAPI = () => {
        let url
        if (this.props.location.state.selectedId !== undefined) {
            url = "http://api.ontherun.me:5000/crimes/"+this.props.location.state.selectedId
        } else {
            url = "http://api.ontherun.me:5000/crimes/"+this.state.item.id
        }

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({item: res.data});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {

       if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {selectedId: this.state.selectedId}}} push={true} />;
        }
            
            let stateList
            let self = this
            stateList = this.state.states.map((state) => {
                return (
                    <tr className="clickable-row" onClick={(e) => self.handleStateNavigation(state.state_abbreviation, e)}>
                        <td><strong>{state.state_abbreviation}</strong></td>
                    </tr>
                );
            })

            let criminalList
            criminalList = this.state.criminals.map((criminal) => {
                return (
                    <tr className="clickable-row" onClick={(e) => self.handleCriminalNavigation(criminal.criminal_id, e)}>
                        <td><strong>{criminal.criminal_id}</strong></td>
                    </tr>
                );
            })

            return (
                <div className="container sub-container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="text-center">
                                <img className="img-thumbnail img-thumbnail-sm" src={this.state.item.image === undefined ? this.state.item.images : this.state.item.image} alt={this.state.item.name} style = {imageStyles}/>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h2 className="sub-header text-center">{this.state.item.name}</h2>
                            <table className="table table-responsive">
                                <tbody>
                                <tr>
                                    <td><strong>Description:</strong></td>
                                    <td>{this.state.item.description}</td>
                                </tr>
                                </tbody>
                            </table>
                            <h3 className="sub-header text-center">States from this Type of Crime</h3>
                            <table className="table table-responsive">
                                <tbody>
                                <tr>
                                    <td>{stateList}</td>
                                </tr>
                                </tbody>
                            </table>
                            <h3 className="sub-header text-center">Criminals from this Type of Crime</h3>
                            <table className="table table-responsive">
                                <tbody>
                                <tr>
                                    <td>{criminalList}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    }