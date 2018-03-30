import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";

var imageStyles = {
    width: '400px',
    height: '350px'
}

var style = {
    width: '400px',
    height: '350px'
}

Geocode.setApiKey("AIzaSyDkRhH7iB4iZW9dDa-FY7HYb8vpjj19Vsc");

export default class Criminal extends Component {
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
            crimes: [],
            totalCount: 0,
            zoom: 11,
            selectedId: "",
            navigate: false,
            navigateTo: "",
            data_states: [],
            data_crimes: [],
            unknown: "Unknown",
            crimeUnavailable: "No crimes available",
            stateUnavailable: "No states available",
            center: {
                lat: 0,
                lng: 0
            }
        }
        //this.apiUrl = 'http://api.ontherun.me:5000/criminals';
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
        this.getCoor()
        this.getStates()
        this.getCrimes()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.item.name !== this.state.item.name)
        {
            this.getStates()
            this.getCrimes()
            this.changeValues()
            this.getCoor()
        }
    }

    /*componentDidUpdate(prevProps, prevState) {
        console.log(prevState.item.name)
        console.log(this.state.item.name)
        if (prevState.item.name !== this.state.item.name)
        {
            this.getStates()
            this.getCrimes()
        }
    }*/

    /* Updating
     An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
     * componentWillReceiveProps()
     * shouldComponentUpdate()
     * componentWillUpdate()
     * render()
     * componentDidUpdate()
     */

    getStates = () => {
        let url = "http://api.ontherun.me:5000/criminalstostate/" + this.state.item.id
        //console.log(this.state.item)
        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                //console.log(res)
                self.setState({data_states: res.data});
                //console.log(this.state.data_states)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getCrimes = () => {
        if (this.state.item.id !== undefined) {
        let url = "http://api.ontherun.me:5000/criminaltocrimes/" + this.state.item.id 
        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                //console.log(res)
                self.setState({data_crimes: res.data});
                //console.log(this.state.data_states)
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    callAPI = () => {
        let url
        if (this.props.location.state.selectedId !== undefined) {
            url = "http://api.ontherun.me:5000/criminals/"+this.props.location.state.selectedId
        } else {
            url = "http://api.ontherun.me:5000/criminals/"+this.state.item.id
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

    handleStateNavigation = (stateId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/State",
            selectedId: stateId
        })
    }

    handleCrimeNavigation = (crimeId,e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Crime",
            selectedId: crimeId
        })
    }

    changeValues = () => {
        console.log(this.state)
        var striptags = require('striptags');
        this.state.item.crime = striptags(this.state.item.crime)
        this.state.item.eyes = this.state.item.eyes.slice(0,1).toUpperCase() + this.state.item.eyes.slice(1, this.state.item.eyes.length)
        this.state.item.hair = this.state.item.hair.slice(0,1).toUpperCase() + this.state.item.hair.slice(1, this.state.item.hair.length)
    }

    getCoor = () => {
        let self = this
        Geocode.fromAddress(this.state.item.field_office).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            self.setState({center: {lat: lat, lng: lng}})
          },
          error => {
            console.error(error);
          }
        );
    }

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {

        if (this.state.item != "")
            this.changeValues()

        this.getCoor()

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {selectedId: this.state.selectedId}}} push={true} />;
        }
        
        let stateList
        let self = this
        //console.log("Reached2"
        //console.log(this.state.data_states)
        stateList = this.state.data_states.map((state) => {
            //console.log(state)
            return (
                <tr className="clickable-row" onClick={(e) => self.handleStateNavigation(state.state, e)}>
                    <td><strong>{state.state}</strong></td>
                </tr>
            );
        })
        if (stateList.length === 0) {
            stateList = this.state.stateUnavailable
        }

        let crimeList
        //console.log(this.state.data_crimes)
        crimeList = this.state.data_crimes.map((crime) => {
            return (
                <tr className="clickable-row" onClick={(e) => self.handleCrimeNavigation(crime.crime_id, e)}>
                    <td><strong>{crime.crime_name}</strong></td>
                </tr>
            );
        })
        if (crimeList.length === 0) {
            crimeList = this.state.crimeUnavailable
        }

        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="text-center" style={{ height: '300px', width: '350px' }}>
                            <img className=" img-thumbnail img-thumbnail-sm" src={this.state.item.image === undefined ? this.state.item.images : this.state.item.image} alt={this.state.item.name} style = {imageStyles}/>
                            <text> Field Office </text>
                            <GoogleMapReact
                              bootstrapURLKeys={{ key: "AIzaSyDkRhH7iB4iZW9dDa-FY7HYb8vpjj19Vsc"}}
                              defaultCenter= {this.state.center}
                              defaultZoom={this.state.zoom}
                            >
                            </GoogleMapReact>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h3 className="sub-header">{this.state.item.name}</h3>
                        <table className="table table-responsive">
                            <tbody>
                            <tr>
                                <td><strong>DOB:</strong></td>
                                <td>{this.state.item.dob == null ? this.state.unknown : this.state.item.dob}</td>
                            </tr>
                            <tr>
                                <td><strong>Gender:</strong></td>
                                <td>{this.state.item.sex == null ? this.state.unknown : this.state.item.sex}</td>
                            </tr>
                            <tr>
                                <td><strong>Eyes:</strong></td>
                                <td>{this.state.item.eyes == null ? this.state.unknown : this.state.item.eyes}</td>
                            </tr>
                            <tr>
                                <td><strong>Hair:</strong></td>
                                <td>{this.state.item.hair == null ? this.state.unknown : this.state.item.hair}</td>
                            </tr>
                            <tr>
                                <td><strong>Height:</strong></td>
                                <td>{this.state.item.height == null ? this.state.unknown : this.state.item.height} Inches</td>
                            </tr>
                            <tr>
                                <td><strong>Race:</strong></td>
                                <td>{this.state.item.race == null ? this.state.unknown : this.state.item.race}</td>
                            </tr>
                            <tr>
                                <td><strong>Nationality:</strong></td>
                                <td>{this.state.item.nationality == null ? this.state.unknown : this.state.item.nationality}</td>
                            </tr>
                            <tr>
                                <td><strong>State:</strong></td>
                                <td> {stateList}</td>
                            </tr>
                            <tr>
                                <td><strong>Description:</strong></td>
                                <td>{this.state.item.crime}</td>
                            </tr>
                            <tr>
                                <td><strong>Crime:</strong></td>
                                <td>{crimeList}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export const truncate = (str, length = 100, ending = '...') => {
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    }
    return str;
};