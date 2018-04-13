import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import 'lodash'


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
            criminals: [],    
            criminalUnavailable: "No criminals available",
            stateUnavailable: "No states available",
        }
    }

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

    getStates() {
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

    getCriminals() {
        if (this.state.item.id !== undefined) {
        let url = "http://api.ontherun.me:5000/crimetocriminals/" + this.state.item.id
        let self = this
        axios.get(url)
            .then((res) => {
                self.setState({criminals: res.data});
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }

    handleCriminalNavigation(criminalId, e) {
        e.preventDefault()
        this.setState({
            navigate: true,
            selectedId: criminalId,
            navigateTo: "/Criminal"
        })
    }

    handleStateNavigation(stateId, e) {
        e.preventDefault()
        this.setState({
            navigate: true,
            selectedId: stateId,
            navigateTo: "/State" 
        })
    }

    callAPI() {
        let url
        console.log(this.props)
        if (this.props.location !== undefined && this.props.location.state.selectedId !== undefined) {
            url = "http://api.ontherun.me:5000/crimes/"+this.props.location.state.selectedId
            //url = "http://18.219.198.152/crimes/" + this.props.location.state.selectedId
        } else {
            url = "http://api.ontherun.me:5000/crimes/"+this.state.item.id
            //url = "http://18.219.198.152/crimes/" + this.state.item.id
        }

        let self = this
        axios.get(url)
            .then((res) => {
                self.setState({item: res.data});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {

        var _ = require('lodash');

       if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {selectedId: this.state.selectedId}}} push={true} />;
        }
            
            let stateList
            let self = this
            stateList = this.state.states.map((state) => {
                return (
                    <tr className="clickable-row" onClick={(e) => self.handleStateNavigation(state.state_abbreviation, e)}>
                        <td><strong>{state.state_name}</strong></td>
                    </tr>
                );
            })
            if (stateList.length === 0) {
                stateList = this.state.stateUnavailable
            }

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
                            <div className="text-center">
                                <img className="img-thumbnail img-thumbnail-sm" src={this.state.item.image === undefined ? this.state.item.images : this.state.item.image} alt={this.state.item.name} style = {imageStyles}/>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h2 className="sub-header text-center">{this.state.item.name}</h2>
                            <table className="table table-responsive text-left">
                                <tbody>
                                <tr>
                                    <td><strong>Description:</strong></td>
                                    <td>{this.state.item.description}</td>
                                </tr>
                                <tr>
                                    <td><strong>Crimes:</strong></td>
                                    <td>{this.state.item.count} crimes committed in 2016</td>
                                </tr>
                                <tr>
                                    <td><strong>Offenders:</strong></td>
                                    <td>{this.state.item.offenders} offenders in 2016</td>
                                </tr>
                                <tr>
                                    <td><strong>Victims:</strong></td>
                                    <td>{this.state.item.victims} victims in 2016</td>
                                </tr>
                                <tr>
                                    <td><strong>FBI Info:</strong></td>
                                    <td><a href={this.state.item.info == null ? this.state.unknown : this.state.item.info}>{this.state.item.info == null ? this.state.unknown : this.state.item.info}</a></td>
                                </tr>
                                </tbody>
                            </table>

                            <div class="col-sm-6">
                            <h3 className="sub-header">States With This Crime</h3>
                            <table className="table table-responsive table-hover text-left">
                                <tbody>
                                {stateList}
                                </tbody>
                            </table>
                            </div>

                            <div class="col-sm-6">
                             <h3 className="sub-header">Criminals Guilty of This Crime</h3>
                            <table className="table table-responsive table-hover text-left">
                                <tbody>
                                {criminalList}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }