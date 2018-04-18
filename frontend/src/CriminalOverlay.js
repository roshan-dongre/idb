import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Thumbnail, Button} from 'react-bootstrap'
import './ModelOverlay.css'
import 'lodash'

var imageStyles = {
    width: '250px',
    height: '250px'
}

var headerStyle = {
    fontSize: '27px',
    fontStyle: 'bold'
}

var textStyle = {
    fontSize: '15px'
}

export default class CriminalOverlay extends Component {
    constructor (props) {
        super (props);
            this.state = {
                item: this.props.item,
                navigate: false,
                navigateTo: this.props.navigateTo
            }
    }

    componentDidMount() {
        this.setState({item: this.props.item})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({item: nextProps.item})
        }
    }

    render() {

        var _ = require('lodash');

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {item: this.state.item}}} push={true} />;
        }
        return (
            <div className="col-md-3 container-thumbnail">
                <div className="text-center">
                    <div onClick={() => this.setState({navigate: true})}>
                        <img className="img-thumbnail" src={this.state.item.image} alt={this.state.item.name} title={this.state.item.name} style = {imageStyles}/>
                        <div className="overlay">
                        <div className="text">
                            <h3 style={headerStyle}>{_.startCase(_.camelCase(this.state.item.name))}</h3>
                            <h4 style={textStyle}>Gender: {this.state.item.sex}</h4>
                            <h4 style={textStyle}>Race: {this.state.item.race}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}