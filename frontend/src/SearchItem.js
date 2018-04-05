import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Highlighter from 'react-highlight-words';

export default class SearchItem extends Component {
    constructor (props) {
        super (props);
        this.state = {
            item: this.props.item,
            searchTerm: this.props.searchTerm,
            navigate: false,
            navigateTo: this.props.navigateTo
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({item: nextProps.item, searchTerm: nextProps.searchTerm})
        }
    }

    handleNavigation = (e) => {
        e.preventDefault()
        this.setState({
            navigate: true
        })
    }



    changeStateValues = () => {
        this.state.item.type = this.state.item.type.slice(0,1).toUpperCase() + this.state.item.type.slice(1, this.state.item.type.length)
    }

    changeCriminalValues = () => {
        var striptags = require('striptags');
        this.state.item.crime = striptags(this.state.item.crime)

        if(this.state.item.eyes != null) {
            this.state.item.eyes = this.state.item.eyes.slice(0,1).toUpperCase() + this.state.item.eyes.slice(1, this.state.item.eyes.length)
        }
        if(this.state.item.hair != null) {
            this.state.item.hair = this.state.item.hair.slice(0,1).toUpperCase() + this.state.item.hair.slice(1, this.state.item.hair.length)
        }
        //date of birth, eyes, field office, hair, nationality, race, sex    

    }

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {item: this.state.item}}} push={true} />;
        }

        let attributes = {}
        let name

        if (this.state.item.type === "criminal") {             // NEED TO CHANGE THIS
            //this.changeStateValues()
            this.changeCriminalValues()
            name = this.state.item.name
            attributes = {
                Name: this.state.item.name,
                DOB: this.state.item.dob,
                Sex: this.state.item.sex,
                Eyes: this.state.item.eyes,
                Hair: this.state.item.hair,
                Height: this.state.item.height,
                Race: this.state.item.race,
                Nationality: this.state.item.nationality,
                Crime: this.state.item.crime
            }
        } else if (this.state.item.type === "state") {    // NEED TO CHANGE THIS
            //this.changeStateValues()
            name = this.state.item.name
            attributes = {
                Name: this.state.item.name,
                Abbreviation: this.state.item.abbreviation,
                Capital: this.state.item.capital,
                Flower: this.state.item.flower,
                Field_offices: this.state.item.field_offices,
                Area: this.state.item.area,
                Population: this.state.item.population,
                Density: this.state.item.density,
                Region: this.state.item.region  
            }
        } else if (this.state.item.type === "crime") {    // NEED TO CHANGE THIS
           //this.changeStateValues()
            name = this.state.item.name
            attributes = {
                Name: this.state.item.name,
                Description: this.state.item.description,
                Count: this.state.item.count,
                Offenders: this.state.item.offenders,
                Victims: this.state.item.victims
            }
        }

        let self = this
        let searchRows = Object.keys(attributes).map(function(key) {
            console.log(key)
            if (attributes[key] !== null && attributes[key] !== undefined) {
                console.log("Search term: " + self.state.searchTerm)

            return (
                <tr>
                    <td className="col-md-2"><strong>{key + ":  "}</strong><Highlighter searchWords={[self.state.searchTerm]} textToHighlight={attributes[key].toString()} /></td>
                </tr>
            );
            }

        })

        return (
            <tr className="clickable-row" onClick={this.handleNavigation}>
                <tr>
                    <td><button type="button" className="btn btn-link" onClick={this.handleNavigation}><h3><strong>{this.state.item.type} - {name}</strong></h3></button></td>
                </tr>
                {searchRows}
            </tr>
        );
    }
}

export const truncate = (str, length = 100, ending = '...') => {
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    }
    return str;
};