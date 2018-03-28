import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './ItemSelector.css'


var imageStyles = {
    width: '250px',
    height: '250px'
}

export default class ItemSelector extends Component {
    constructor (props) {
        super (props);
            this.state = {
                item: this.props.item,
                navigate: false,
                navigateTo: this.props.navigateTo
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
        this.setState({item: this.props.item})
    }

    /* Updating
     An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
     * componentWillReceiveProps()
     * shouldComponentUpdate()
     * componentWillUpdate()
     * render()
     * componentDidUpdate()
     */

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({item: nextProps.item})
        }
    }

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {

        if (this.state.navigate) {
            return <Redirect to={{pathname: this.state.navigateTo, state: {item: this.state.item}}} push={true} />;
        }
        {console.log("Reached1")}
        return (
            <div className="col-md-3 container-thumbnail">
                <div className="text-center">
                    <div onClick={() => this.setState({navigate: true})}>
                        <img className="img-thumbnail" src={this.state.item.image} alt={this.state.item.name} title={this.state.item.name} style = {imageStyles}/>
                        <div className="overlay">
                            <div className="text">{this.state.item.name.toUpperCase()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}