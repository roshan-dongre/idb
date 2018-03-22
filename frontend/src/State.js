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
        console.log(this.props)
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
            state: "",
            unknown: "Unknown",
            center: {
                lat: 0,
                lng: 0
            },
            crimes: []
        }
        this.apiUrl = 'http://api.ontherun.me:5000/states';
        console.log(this.state.item.name)

    }

    /* Mounting
     These methods are called when an instance of a component is being created and inserted into the DOM:
     * constructor()
     * componentWillMount()
     * render()
     * componentDidMount()
     */

    componentDidMount () {
        //this.callAPI()
        this.getCoor()
        this.getCrimes()
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
        if (prevState.item.name !== this.state.item.name)
        {
            this.getCrimes()
        }
    }

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    getCrimes = () => {
        let url = "http://api.ontherun.me:5000/crimestostate/" + this.state.item.abbreviation // need to fix this
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



    /*callAPI = () => {
        let url
        if (this.props.location.state.selectedId !== undefined) {
            url = "http://ontherun.me:5000/api/states/"+this.props.location.state.id
        } else {
            url = "http://ontherun.me:5000/api/states/"+this.state.item.id
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
    }*/

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
        if (temp == "Georgia") {
            temp = "Georgia USA"
        }
        Geocode.fromAddress(temp).then(
          response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            //self.setState({lat: lat, lng: lng})
            self.setState({center: {lat: lat, lng: lng}})
          },
          error => {
            console.error(error);
          }
        );
    }

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {
        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {selectedId: this.state.selectedId}}} push={true} />;
        }

        let crimeList

        console.log(this.state.crimes)
        let self = this
         crimeList = this.state.crimes.map((crime) => {
            return (
                <tr className="clickable-row" onClick={(e) => self.handleCrimeNavigation(crime.crime_id, e)}>
                    <td><strong>{crime.crime_name}</strong></td>
                </tr>
            );
        })

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
                        <table className="table table-responsive">
                            <tbody>
                            <tr>
                                <td><strong>Abbreviation:</strong></td>
                                <td>{this.state.item.abbreviation == null ? this.state.unknown : this.state.item.abbreviation}</td>
                            </tr>
                            <tr>
                                <td><strong>Population:</strong></td>
                                <td>{this.state.item.population == null ? this.state.unknown : this.state.item.population}</td>
                            </tr>
                            <tr>
                                <td><strong>Description:</strong></td>
                                <td>Need more stuff here</td>
                            </tr>
                            {/*<tr>
                                <td><strong>Brewery:</strong></td>
                                <td><button type="button" className="btn btn-link" onClick={this.handleBreweryNavigation}>{this.state.item.brewery}</button></td>
                            </tr>
                            <tr>
                                <td><strong>Style:</strong></td>
                                <td><button type="button" className="btn btn-link" onClick={this.handleStyleNavigation}>{this.state.item.style}</button></td>
                            </tr>
                            <tr>
                                <td><strong>Organic:</strong></td>
                                <td>{this.state.item.organic}</td>
                            </tr>*/}
                            </tbody>
                        </table>
                        <h3 className="sub-header">Crimes in this State</h3>
                        <table className="table table-responsive table-hover">
                            <thead>
                            <tr>
                                <th>Crime</th>
                            </tr>
                            </thead>
                            <tbody>
                            {crimeList}
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