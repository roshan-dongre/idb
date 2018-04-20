import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import {Row, Col, Panel, Button, Modal, Well} from 'react-bootstrap'

var imageStyles = {
    width: '400px',
    height: '350px'
}

var style = {
    width: '400px',
    height: '350px'
}

var textStyles = {
    color: 'black'
}

var wellStyles = {
    background: '#7f8fa6'
}

var wellSecond = {
    background: '#8C4A51'
}

var button = {
    background: '#2d3436',
    borderColor: '#2d3436'
}

export default class State extends Component {
    constructor (props) {
        super (props);
        this.handleShowCrimes = this.handleShowCrimes.bind(this);
        this.handleCloseCrimes = this.handleCloseCrimes.bind(this);
        this.handleShowCriminals = this.handleShowCriminals.bind(this);
        this.handleCloseCriminals = this.handleCloseCriminals.bind(this);
        let item = "";

        if ('location' in this.props  && this.props.location.state.item !== undefined) {
            item = this.props.location.state.item
        } else if (this.props.item !== undefined) {
            item = this.props.item
        }
        this.state = {
            item: item,
            states: [],
            totalCount: 0,
            zoom: 5,
            selectedId: "",
            navigate: false,
            navigateTo: "",
            unknown: "Unknown",
            crimeUnavailable: "No crimes available",
            criminalUnavailable: "No criminals available",
            center: {
                lat: 0,
                lng: 0
            },
            crimes: [],
            criminals: [],
            showCrimes: false,
            showCriminals: false
        }
    }

    handleCloseCrimes() {
        this.setState({ showCrimes: false });
    }

    handleShowCrimes() {
        this.setState({ showCrimes: true });
    }

    handleCloseCriminals() {
        this.setState({ showCriminals: false });
    }

    handleShowCriminals() {
        this.setState({ showCriminals: true });
    }

    componentDidMount () {
        this.callAPI()
        this.getCrimes()
        this.getCriminals()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.item.name !== this.state.item.name)
        {
            this.getCrimes()
            this.getCriminals()
        }
    }

    getCrimes() {
        //let url = "http://18.219.198.152/crimestostate/" + this.state.item.abbreviation
        let url = "http://api.ontherun.me/crimestostate/" + this.state.item.abbreviation
        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({crimes: res.data});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    getCriminals() {
        let url = "http://api.ontherun.me/criminalstostate/" + this.state.item.abbreviation
        //let url = "http://18.219.198.152/criminalstostate/" + this.state.item.abbreviation
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

    callAPI() {
        let url
        if (this.props.location !== undefined && this.props.location.state.selectedId !== undefined) {
            url = "http://api.ontherun.me/states/"+this.props.location.state.selectedId
        } else {
            url = "http://api.ontherun.me/states/"+this.state.item.abbreviation
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

    handleCrimeNavigation(crimeId, e) {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Crime",
            selectedId: crimeId
        })
    }

    handleCriminalNavigation(criminalId, e) {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Criminal",
            selectedId: criminalId
        })
    }

    getCoor() {
        let self = this
        var temp = this.state.item.name
        if (this.state.item.name !== undefined) {
        if (temp == "Georgia") {
            temp = "Georgia USA"
        }
    }

        

        // Geocode.fromAddress(temp).then(
        //   response => {
        //     const { lat, lng } = response.results[0].geometry.location;
        //     console.log("Lat: " + lat)
        //     console.log("Long: " + lng)
        //     //self.setState({lat: lat, lng: lng})
        //     self.setState({center: {lat: lat, lng: lng}})
        //   },
        //   error => {
        //     console.error(error);
        //   }
        // );
        // }
    }

    render() {

        var _ = require('lodash');

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {selectedId: this.state.selectedId}}} push={true} />;
        }
        var lat = 0;
        var lng = 0;
        // Get latitude and longitude of the state for Google Maps
        if (this.state.item.center) {
            lat = this.state.item.center.lat
            lng = this.state.item.center.lng
        }
        else {
            // this.setState({item: item})
            // lat = this.state.item.center.lat
            // lng = this.state.item.center.lng
            lat = 37.0902
            lng = -95.7129
        }

        let crimeList
        let self = this
        // Get each crime committed in that state
        crimeList = this.state.crimes.map((crime) => {
            return (
                <tr className="clickable-row" onClick={(e) => self.handleCrimeNavigation(crime.crime_id, e)}>
                    <td><strong>{crime.crime_name}</strong></td>
                </tr>
            );
        })
        if (crimeList.length === 0) {
            crimeList = this.state.crimeUnavailable
        }

        // Get each criminal in this state
        let criminalList
        criminalList = this.state.criminals.map((criminal) => {
            return (
                <tr className="clickable-row" onClick={(e) => self.handleCriminalNavigation(criminal.criminal_id, e)}>
                    <td><strong>{_.startCase(_.camelCase(criminal.criminal_name))}</strong></td>
                </tr>
            );
        })
        if (criminalList.length === 0) {
            criminalList = this.state.criminalUnavailable
        }

      

        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-4">
                       <div className="text-center" style={{ height: '300px', width: '350px' }}>
                            <img className=" img-thumbnail img-thumbnail-sm" src={this.state.item.image === undefined ? this.state.item.images : this.state.item.image} alt={this.state.item.name} style = {imageStyles}/>
                            

                            // Renders the map of this state 
                            <text> State Map </text>
                            <GoogleMapReact
                              bootstrapURLKeys={{ key: "AIzaSyDkRhH7iB4iZW9dDa-FY7HYb8vpjj19Vsc"}}
                              defaultCenter= {[lat, lng]}
                              defaultZoom={this.state.zoom}
                            >
                            </GoogleMapReact>
                        </div>
                    </div>

                    // Renders the information for this state
                    <div className="col-md-8" style={textStyles}>
                        <Well style= {wellStyles}>
                        <h2 className="sub-header">{this.state.item.name}</h2>
                        <table className="table table-responsive text-left">
                            <tbody>
                            <tr>
                                <td><strong>Abbreviation:</strong></td>
                                <td>{this.state.item.abbreviation == null ? this.state.unknown : this.state.item.abbreviation}</td>
                            </tr>
                            <tr>
                                <td><strong>Capital:</strong></td>
                                <td>{this.state.item.capital == null ? this.state.unknown : this.state.item.capital}</td>
                            </tr>

                            

                            <tr>
                                <td><strong>State Flower:</strong></td>
                                <td>{this.state.item.flower == null ? this.state.unknown : this.state.item.flower}</td>
                            </tr>
                            <tr>
                                <td><strong>Area:</strong></td>
                                <td>{this.state.item.area == null ? this.state.unknown : this.state.item.area} square miles</td>
                            </tr>
                            <tr>
                                <td><strong>Population:</strong></td>
                                <td>{this.state.item.population == null ? this.state.unknown : this.state.item.population}</td>
                            </tr>
                            <tr>
                                <td><strong>Density:</strong></td>
                                <td>{this.state.item.density == null ? this.state.unknown : this.state.item.density.toFixed(2)} people per square mile</td>
                            </tr>
                            <tr>
                                <td><strong>Region:</strong></td>
                                <td>{this.state.item.region == null ? this.state.unknown : this.state.item.region}</td>
                            </tr>
                            <tr>
                                <td><strong>Wiki Link:</strong></td>
                                <td><strong><a href={this.state.item.wiki == null ? this.state.unknown : this.state.item.wiki} style={{ color: '#000' }}>{this.state.item.wiki == null ? this.state.unknown : this.state.item.wiki}</a></strong></td>
                            </tr>
                            </tbody>
                        </table>

                    </Well>

                        <Well style={wellSecond}>    
                        <div class="row">
                        <div class="col-sm-6">
                            <Button bsStyle="primary" bsSize="large" style = {button} onClick={this.handleShowCrimes}>
                                See Crimes in this State!
                            </Button>
                        </div>

                        <div class="col-sm-6">
                            <Button bsStyle="primary" bsSize="large" style = {button} onClick={this.handleShowCriminals}>
                                See Criminals in this State!
                            </Button>
                        </div>
                        </div>
                        </Well>

                        // Show the crimes that took place in this state
                        <Modal show={this.state.showCrimes} onHide={this.handleCloseCrimes} style = {textStyles}>
                            <Modal.Header closeButton>
                                <Modal.Title>Crimes in This State</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                  <table className="table table-responsive table-hover text-left">
                                    <tbody>
                                    {crimeList}
                                    </tbody>
                                  </table>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button onClick={this.handleCloseCrimes}>Close</Button>
                              </Modal.Footer>
                        </Modal>

                        // Show the criminals from this state 
                        <Modal show={this.state.showCriminals} onHide={this.handleCloseCriminals} style = {textStyles}>
                            <Modal.Header closeButton>
                                <Modal.Title>Criminals in This State</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <table className="table table-responsive table-hover text-left">
                                    <tbody>
                                    {criminalList}
                                    </tbody>
                                  </table>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button onClick={this.handleCloseCriminals}>Close</Button>
                              </Modal.Footer>
                        </Modal>

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