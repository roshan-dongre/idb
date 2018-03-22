import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Criminal extends Component {
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
            reviews: [],
            totalCount: 0,
            selectedReview: "",
            selectedId: "",
            navigate: false,
            navigateTo: ""
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/beers';
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
        let url = "https://backend-staging-183303.appspot.com/reviews?beer_name=" + this.state.item.name
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
            url = "https://backend-staging-183303.appspot.com/beers/"+this.props.location.state.selectedId
        } else {
            url = "https://backend-staging-183303.appspot.com/beers/"+this.state.item.id
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

    handleReviewNavigation = (reviewId, e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Review",
            selectedId: reviewId,
            selectedReview: reviewId
        })
    }

    handleBreweryNavigation = (e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Brewery",
            selectedId: this.state.item.brewery_id
        })
    }

    handleStyleNavigation = (e) => {
        e.preventDefault()
        this.setState({
            navigate: true,
            navigateTo: "/Style",
            selectedId: this.state.item.style_id
        })
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
            beerReviews = "No reviews are currently available for this beer"
        }

        return (
            <div className="container sub-container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="text-center">
                            <img   className=" img-thumbnail img-thumbnail-sm" src={this.state.item.image === undefined ? this.state.item.images : this.state.item.image} alt={this.state.item.name} />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h2 className="sub-header">{this.state.item.name}</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td><strong>ABV:</strong></td>
                                <td>{this.state.item.abv}</td>
                            </tr>
                            <tr>
                                <td><strong>IBU:</strong></td>
                                <td>{this.state.item.ibu}</td>
                            </tr>
                            <tr>
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
                            </tr>
                            </tbody>
                        </table>
                        <h3 className="sub-header">Reviews</h3>
                        <table className="table table-responsive table-hover">
                            <thead>
                            <tr>
                                <th>Rating</th>
                                <th>Comment</th>
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