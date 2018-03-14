import React, {PropTypes} from 'react'
import {Link} from 'react-router-dom'
import {
    Button,
    DropdownButton,
    Form,
    FormControl,
    FormGroup,
    MenuItem,
    OverlayTrigger,
    Pagination,
    Popover
} from 'react-bootstrap'
import Highlighter from 'react-highlight-words'
import './Header.css'
import styles from './Crimes.css'
import './ModelStyle.css'

var axios = require('axios');

var dropdownStyle = {
    margin: '10px',
    backgroundColor: '#2b2b2b',
    borderColor: '#2b2b2b',
    color: 'white',
}

{/* Used to split the crime data so there is 3 per row */}

function splitarray(input, spacing) {
    var output = [];
    for (var i = 0; i < input.length; i += spacing) {
        output[output.length] = input.slice(i, i + spacing);
    }
    return output;
}

class crimes extends React.Component {
    constructor(props) {
        super(props);
        //this.handleSelectSort = this.handleSelectSort.bind(this);
        //this.handleSelectDirection = this.handleSelectDirection.bind(this);
        //this.handleSelect = this.handleSelect.bind(this);
        //this.handleSelectFilter = this.handleSelectFilter.bind(this);
        //this.handleResetFilter = this.handleResetFilter.bind(this);
        //this.handleSearchChange = this.handleSearchChange.bind(this);
        //this.updateItems = this.updateItems.bind(this);

        this.state = this.getInitialState();
        this.updateItems();
    }

    getInitialState() {
        return {
            //search_string: '',
            crimes: [],
            crimesGrouped: [],
            numPages: 1,
            activePage: 1,
            resultsPerPage: 100,
            orderBy: 'name',
            orderDirection: 'asc',
            q: {
                'order_by': [{"field": "name", "direction": "asc"}],
                'filters': [{"name": "image", "op": "is_not_null"}]
            }
        };
    }

    //* Rerenders/updates the page to get the new data triggered by pagination, sorting, etc */
    updateItems() {
        var url = 'http://ontherun.me:5000/api/crimes';
        var params = {
            results_per_page: this.state.resultsPerPage,
            page: this.state.activePage,
            q: JSON.stringify(this.state.q),
        };
        /*if (this.state.search_string.length > 0) {
            url = 'http://marvelus.me/api/search/crime';
            params['query'] = this.state.search_string;

        }*/
        axios.get(url, {
            params: params
        }).then(res => {
            this.state.numPages = res.data.total_pages;
            const crimes = res.data.objects.map(crime => crime);
            const crimesGrouped = splitarray(crimes, 3)
            this.setState({crimesGrouped});
        });
    }

    //* When you select a page in the pagination bar */
    /*handleSelect(eventKey) {
        this.state.activePage = eventKey;
        this.updateItems();
    } */

    //* Select how to sort (what attributes) the crimes */
    /* handleSelectSort(eventKey) {
        this.state.q.order_by[0].field = eventKey;
        this.updateItems()

    } */

    /* Select which way to sort the attributes (asc/desc) */
    /* handleSelectDirection(eventKey) {
        this.state.q.order_by[0].direction = eventKey;
        this.updateItems();
    } */

    /* Select which filter to use */
    /* handleSelectFilter(eventKey) {
        this.state.q.filters.push({"name": "id", "op": "gt", "val": 9860});
        this.updateItems();
    } */

    /* Resets all options to the way when user first came to site */
    /* handleResetFilter() {
        this.state.q.filters = [{"name": "image", "op": "is_not_null"}];
        this.state.search_string = '';
        this.updateItems();
    } */

    /* Live change as user types into search bar */
    /* handleSearchChange(eventKey) {
        this.state.search_string = eventKey.target.value;
        this.updateItems();
    } */

    /* Displays the "sort by" dropdown */
    /* renderDropdownButtonSortby(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"sort"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectSort}>
                <MenuItem eventKey="name">Name</MenuItem>
                <MenuItem eventKey="birthday">Birthday</MenuItem>

            </DropdownButton>
        );
    } */

    /* Displays the "filter" dropdown */
    /* renderDropdownButtonFilter(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} key={"filter"} id={'dropdown-basic-${i}'}
                            onSelect={this.handleSelectFilter}>
                <MenuItem eventKey="movies">Appears In Movie(s)</MenuItem>
                <MenuItem eventKey="tvshows">Appears In TV Show(s)</MenuItem>
            </DropdownButton>
        );
    } */

    /* Displays the "order" dropdown */
    /* renderDropdownButtonSortDirection(title, i) {
        return (
            <DropdownButton style={dropdownStyle} title={title} onSelect={this.handleSelectDirection}>
                <MenuItem eventKey="asc">Ascending</MenuItem>
                <MenuItem eventKey="desc">Descending</MenuItem>
            </DropdownButton>
        );
    } */

    /* Displays the "reset filter" button */
    /* renderResetFilterButton(title) {
        return (
            <Button style={dropdownStyle} title={title} onClick={this.handleResetFilter}>Reset Filter
            </Button>
        );
    } */

    render() {
        return (
            <div className="container" styles="margin-top:100px;">
                { /* <div className="row"> */}
                    {/* Display all sorting, filtering, searching options */}
                    {/*
                    <div className='text-center'>
                        <form onSubmit={e => {
                            e.preventDefault()
                        }}>
                            <Form inline>
                                {this.renderDropdownButtonSortby("Sort By: ", "name")}
                                {this.renderDropdownButtonSortDirection("Order", "")}
                                {this.renderDropdownButtonFilter("Filter", "")}
                                {this.renderResetFilterButton("Filter")}
                                <FormGroup controlId="formBasicText">
                                    <FormControl
                                        type="text"
                                        placeholder="Search in crimes..."
                                        onChange={this.handleSearchChange}/>
                                </FormGroup>
                            </Form>
                        </form>
                    </div>
                </div>

                <form>
                </form>

                {/* Go through and display 6 crimes per page */}

                {this.state.crimesGrouped.length == 0 || !this.state.crimesGrouped ? null :
                    this.state.crimesGrouped.map(crimeList =>
                        !crimeList ? null :
                            <div className="row">{crimeList.map((crime, i) =>
                                <div className="col-sm-4">
                                    <Link to={"/crime/" + crime.id}>
                                        <div className="panel">
                                            <div className="panel-heading">

                                                {/* For crime search -- highlights the word found */}
                                                <Highlighter
                                                    highlightClassName={styles.Highlight}
                                                    searchWords={this.state.search_string.split(" ")}
                                                    autoEscape={true}
                                                    textToHighlight={crime.name}
                                                />

                                            </div>

                                            {/* In charge of the popover when you hover over the crime's picture */}

                                            <OverlayTrigger trigger={['hover', 'focus']}
                                                            placement={i === 0 ? "right" : "left"}
                                                            overlay={<Popover id="popover-trigger-hover-focus">
                                                                <strong><u>{<Highlighter
                                                                    highlightClassName={styles.Highlight}
                                                                    searchWords={this.state.search_string.split(" ")}
                                                                    autoEscape={true}
                                                                    textToHighlight={crime.name}
                                                                />}</u></strong>
                                                                <br/><br/>
                                                                <strong>Bio: </strong>
                                                                {<Highlighter
                                                                    highlightClassName={styles.Highlight}
                                                                    searchWords={this.state.search_string.split(" ")}
                                                                    autoEscape={true}
                                                                    textToHighlight={crime.bio}
                                                                />}<br/>
                                                                <strong>Birthday: </strong>
                                                                {crime.birthday}<br/>
                                                                <strong># of TV Shows: </strong>
                                                                {crime.tvshows.length}<br/>
                                                                <strong># of Movies: </strong>
                                                                {crime.movies.length}<br/>
                                                                <strong>Character(s): </strong>
                                                                <ul>
                                                                    {crime.characters.length > 0 ? crime.characters.map(function (character) {
                                                                        return (<li>{character.name}</li>)
                                                                    }) : "None"}
                                                                </ul>

                                                            </Popover>}>

                                                <div className="panel-body">
                                                    <img
                                                        src={"https://image.tmdb.org/t/p/w640/" + crime.image}
                                                        className="img-responsive"
                                                        alt="Image"/>

                                                </div>
                                            </OverlayTrigger>
                                        </div>
                                    </Link>
                                </div>
                            )}
                            </div>)

                }

                {/* Display the pagination bar */}
                <div className='text-center'>
                    {!this.state.numPages
                        ? null
                        : <Pagination
                            bsSize='large'
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={this.state.numPages}
                            maxButtons={10}
                            activePage={this.state.activePage}
                            onSelect={this.handleSelect}/>
                    }
                </div>
            </div>

        );
    }
}

export default crimes