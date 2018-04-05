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

export default class State extends Component {
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
            criminals: []
        }
    }

    componentDidMount () {
        this.callAPI()
        this.getCoor()
        this.getCrimes()
        this.getCriminals()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.item.name !== this.state.item.name)
        {
            this.getCrimes()
            this.getCriminals()
            this.getCoor()
        }
    }

    getCrimes = () => {
        let url = "http://18.219.198.152/crimestostate/" + this.state.item.abbreviation
        //let url = "http://api.ontherun.me:5000/crimestostate/" + this.state.item.abbreviation
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

    getCriminals = () => {
        //let url = "http://api.ontherun.me:5000/criminalstostate/" + this.state.item.abbreviation
        let url = "http://18.219.198.152/criminalstostate/" + this.state.item.abbreviation
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

    callAPI = () => {
        let url
        // if (this.props.location !== undefined && this.props.location.state.selectedId !== undefined) {
        //     url = "http://api.ontherun.me:5000/states/"+this.props.location.state.selectedId
        // } else {
        //     url = "http://api.ontherun.me:5000/states/"+this.state.item.abbreviation
        // }

        if (this.props.location !== undefined && this.props.location.state.selectedId !== undefined) {
            url = "http://18.219.198.152/states/"+this.props.location.state.selectedId
        } else {
            url = "http://18.219.198.152/states/"+this.state.item.abbreviation
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

    handleCrimeNavigation = (crimeId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Crime",
            selectedId: crimeId
        })
    }

    handleCriminalNavigation = (criminalId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Criminal",
            selectedId: criminalId
        })
    }

    getCoor = () => {
        let self = this
        var temp = this.state.item.name
        if (this.state.item.name !== undefined) {
        if (temp == "Georgia") {
            temp = "Georgia USA"
        }
        Geocode.fromAddress(temp).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log("Lat: " + lat)
            console.log("Long: " + lng)
            //self.setState({lat: lat, lng: lng})
            self.setState({center: {lat: lat, lng: lng}})
          },
          error => {
            console.error(error);
          }
        );
        }
    }

    render() {

        var _ = require('lodash');

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {selectedId: this.state.selectedId}}} push={true} />;
        }

        let crimeList
        let self = this
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

        let criminalList
        criminalList = this.state.criminals.map((criminal) => {
            return (
                <tr className="clickable-row" onClick={(e) => self.handleCriminalNavigation(criminal.id, e)}>
                    <td><strong>{_.startCase(_.camelCase(criminal.name))}</strong></td>
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
                            <div>{this.getCoor()}</div>
                            <text> State Map </text>
                            <GoogleMapReact
                              bootstrapURLKeys={{ key: "AIzaSyDkRhH7iB4iZW9dDa-FY7HYb8vpjj19Vsc"}}
                              defaultCenter= {this.state.center}
                              defaultZoom={this.state.zoom}
                            >
                            </GoogleMapReact>
                        </div>
                    </div>
                    <div className="col-md-8">
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
                            </tbody>
                        </table>
                        <h3 className="sub-header">Crimes In This State</h3>
                        <table className="table table-responsive table-hover text-left">
                            <tbody>
                            {crimeList}
                            </tbody>
                        </table>
                         <h3 className="sub-header">Criminals In This State</h3>
                        <table className="table table-responsive table-hover text-left">
                            <tbody>
                            {criminalList}
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