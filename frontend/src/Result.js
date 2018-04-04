import React, { Component } from 'react';
import Criminal from './Criminal';
import State from './State';
import Crime from './Crime';

export default class Result extends Component {
    constructor (props) {
        super (props);
        this.state = {
            item: this.props.location.state.item
        }
    }

    render() {
        {console.log(this.state.item)}
        if ('eyes' in this.state.item) {               // This is a criminal item
            return <Criminal item={this.state.item} />
        } else if ('area' in this.state.item) {    // This is a state item
            return <State item={this.state.item} />
        } else if ('offenders' in this.state.item) {        // This is a crime item
            return <Crime item={this.state.item} />
        }
    }
}