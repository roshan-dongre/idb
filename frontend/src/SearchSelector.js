import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import Highlighter from 'react-highlight-words';

export default class SearchSelector extends Component {
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

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {item: this.state.item}}} push={true} />;
        }

        let attributes = {}
        let name

        if (this.state.item.type === "criminal") {             // NEED TO CHANGE THIS
            name = this.state.item.name
            attributes = {
                name: this.state.item.name,
                dob: this.state.item.dob,
                sex: this.state.item.sex,
                eyes: this.state.item.eyes,
                hair: this.state.item.hair,
                height: this.state.item.height,
                race: this.state.item.race,
                nationality: this.state.item.nationality,
                crime: this.state.item.crime
            }

        } else if (this.state.item.type === "state") {    // NEED TO CHANGE THIS
            name = this.state.item.name
            attributes = {
                name: this.state.item.name,
                abbreviation: this.state.item.abbreviation,
                capital: this.state.item.capital,
                flower: this.state.item.flower,
                field_offices: this.state.item.field_offices,
                area: this.state.item.area,
                population: this.state.item.population,
                density: this.state.item.density,
                region: this.state.item.region  
            }

        } else if (this.state.item.type === "crime") {    // NEED TO CHANGE THIS
            name = this.state.item.name
            attributes = {
                name: this.state.item.name,
                description: this.state.item.description,
                count: this.state.item.count,
                offenders: this.state.item.offenders,
                victims: this.state.item.victims
            }
        }

        let self = this
        let searchRows = Object.keys(attributes).map(function(key) {
            if (attributes[key] !== null && attributes[key] !== undefined) {
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