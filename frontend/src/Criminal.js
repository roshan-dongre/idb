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
        console.log(this.props)
        if ('location' in this.props  && this.props.location.state.item !== undefined) {
            item = this.props.location.state.item
        } else if (this.props.item !== undefined) {
            item = this.props.item
        }
        this.state = {
            item: item,
            crimes: [],
            totalCount: 0,
            lat: 0,
            lng: 0,
            zoom: 11,
            selectedId: "",
            navigate: false,
            navigateTo: "",
            state: "",
            unknown: "Unknown",
            center: {
                lat: 0,
                lng: 0
            }
        }
        this.apiUrl = 'http://api.ontherun.me:5000/criminals';
        console.log(this.state.item.crime)

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
        this.getReviews()
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
            this.getReviews()
        }
    }

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    getReviews = () => {
        let url = "http://api.ontherun.me:5000/criminals/" + this.state.item.id // need to fix this
        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({reviews: res.data.records, totalCount: res.data.totalCount});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    callAPI = () => {
        let url
        if (this.props.location.state.selectedId !== undefined) {
            url = "http://api.ontherun.me:5000/criminals/"+this.props.location.state.id
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

    handleStateNavigation = (reviewId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/State",
            //selectedId: reviewId,
            //selectedReview: reviewId
        })
    }

    handleCrimeNavigation = (e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Crime",
            //selectedId: this.state.item.brewery_id
        })
    }

    changeValues = () => {
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

        let beerReviews
        if (this.state.totalCount > 0) {
            let self = this
             beerReviews = this.state.reviews.map((review) => {
                 review.image = self.state.item.image
                return (
                    <tr className="clickable-row" onClick={(e) => self.handleReviewNavigation(review.id, e)}>
                        <td><strong>{review.rating}</strong></td>
                        <td>{truncate(review.comment)}</td>
                    </tr>
                );
            })
        } else {
            beerReviews = "No news is currently available for this person"
        }

        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="text-center" style={{ height: '300px', width: '350px' }}>
                            <img className=" img-thumbnail img-thumbnail-sm" src={this.state.item.image === undefined ? this.state.item.images : this.state.item.image} alt={this.state.item.name} style = {imageStyles}/>
                            <div>{this.getCoor()}</div>
                            <text> Field Office </text>
                            <GoogleMapReact
                              bootstrapURLKeys={{ key: "AIzaSyDkRhH7iB4iZW9dDa-FY7HYb8vpjj19Vsc"}}
                              defaultCenter= {this.state.center}
                              defaultZoom={this.state.zoom}
                            >
                            </GoogleMapReact>
                        </div>
                    </div>
                    <div>{this.changeValues()}</div>
                    <div className="col-md-8">
                        <h2 className="sub-header">{this.state.item.name}</h2>
                        <table className="table table-responsive">
                            <tbody>
                            <tr>
                                <td><strong>DOB:</strong></td>
                                <td>{this.state.item.dob == null ? this.state.unknown : this.state.item.dob}</td>
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
                                <td>{this.state.item.height == null ? this.state.unknown : this.state.item.height}</td>
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
                                <td>STATE LINK GOES HERE</td>
                            </tr>
                            <tr>
                                <td><strong>Description:</strong></td>
                                <td>{this.state.item.crime}</td>
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
                        <h3 className="sub-header">Types of Crimes</h3>
                        <table className="table table-responsive table-hover">
                            <thead>
                            <tr>
                                <th>Crime</th>
                            </tr>
                            </thead>
                            <tbody>
                            {beerReviews}
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