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
            navigateTo: ""
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

    handleCriminalNavigation = (criminalId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            //selectedId: crimeId,
            navigateTo: "/Criminal"
        })
    }

    handleStateNavigation = (styleId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            //selectedId: styleId,
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

        let crimeLinks, styleLinks
        if (this.state.item !== "") {
            /*crimeLinks = this.state.item.crimes.map((crime, index) => {
                return (
                    <div className="text-center">
                        <button type="button" className="btn btn-link" onClick={(e) => this.handlecrimeNavigation(this.state.item.crime_ids[index], e)}>{crime}</button>
                    </div>
                );
            })

            styleLinks = this.state.item.styles.map((style, index) => {
                return (
                    <div className="text-center">
                        <button type="button" className="btn btn-link" onClick={(e) => this.handleStyleNavigation(this.state.item.style_ids[index], e)}>{style}</button>
                    </div>
                );
            }) */

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
                                <tr>
                                    <td><strong>Website:</strong></td>
                                    <td><a href={this.state.item.website}>{this.state.item.website}</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <h4 className="sub-header text-center">Criminals from this type of crime {this.state.item.name}</h4>
                            <table className="table table-responsive">
                                <tbody>
                                <tr>
                                    <td>{crimeLinks}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <h4 className="sub-header text-center">More Styles Offered By {this.state.item.name}</h4>
                            <table className="table table-responsive">
                                <tbody>
                                <tr>
                                    <td>{styleLinks}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}