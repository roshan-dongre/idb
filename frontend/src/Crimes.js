// import React, { Component } from 'react';
// import chunk from 'lodash.chunk';
// import axios from 'axios';

// import ItemSelector from './ItemSelector';
// import PageSelector from './PageSelector';


// export default class Crimes extends Component {
//     constructor (props) {
//         super (props);
//         this.state = {
//             crimes: [],
//             allStates: [],
//             allCountries: [],
//             selectedState: "",
//             selectedCountry: "",
//             page: 0,
//             numPages: 0,
//             totalCount: 0,
//             pageLimit: 16,
//             sortBy: "",
//             pathname: "/crimes"
//         }
//         this.apiUrl = 'http://ontherun.me:5000/api/crimes';
//     }

//     /* Mounting
//         These methods are called when an instance of a component is being created and inserted into the DOM:
//             * constructor()
//             * componentWillMount()
//             * render()
//             * componentDidMount()
//      */

//     componentDidMount () {
//         this.callAPI()
//         this.getStatesCountries()
//     }

//     handlePageChange = (page, e) => {
//         e.preventDefault()
//         //return <Redirect to={{pathname: this.state.pathname, state: {page: page}}} push={true} />;
//         this.setState({page: page})
//     }

//     handlePrev = (e) => {
//         e.preventDefault()
//         if (this.state.page > 0) {
//             this.setState({page: this.state.page - 1})
//         }
//     }

//     handleNext = (e) => {
//         e.preventDefault()
//         if (this.state.page < this.state.numPages - 1) {
//             this.setState({page: this.state.page + 1})
//         }
//     }

//     handleCountry = (e) => {
//         this.setState({selectedCountry: e.target.value})
//     }

//     handleState = (e) => {
//         this.setState({selectedState: e.target.value})
//     }

//     sort = (order) => {
//         this.setState({sortBy: order})
//     }

//     callAPI = () => {

//         let limit = this.state.pageLimit
//         let offset = this.state.page * this.state.pageLimit
//         let limOff = "?limit="+limit+"&offset="+offset
//         let url = "http://ontherun.me:5000/api/crimes"+limOff

//         if (this.state.selectedState !== "All" && this.state.selectedState !== "") {
//             url += "&state="+this.state.selectedState
//         }
//         if (this.state.selectedCountry !== "All" && this.state.selectedCountry !== "") {
//             url += "&country="+this.state.selectedCountry
//         }
//         if (this.state.sortBy !== "") {
//             url += "&sort_by="+this.state.sortBy
//         }

//         let self = this
//         axios.get(url)
//             .then((res) => {
//                 // Set state with result
//                 self.setState({crimes: res.data.records, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pageLimit)});
//             })
//             .catch((error) => {
//                 console.log(error)
//             });
//     }

//     getStatesCountries = () => {
//         let url = 'http://ontherun.me:5000/api/crimes';
//         let states = new Set([])
//         let countries = new Set([])

//         let self = this
//         axios.get(url)
//             .then((res) => {
//                 // Set state with names of styles
//                 res.data.records.forEach((crime) => {
//                     states.add(crime.state);
//                     countries.add(crime.country)
//                 })
//                 states = ['All',...Array.from(states).sort()]
//                 countries = ['All',...Array.from(countries).sort()]
//                 self.setState({allStates: states, allCountries: countries});
//             })
//             .catch((error) => {
//                 console.log(error)
//             });
//     }

//     /* Updating
//         An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
//             * componentWillReceiveProps()
//             * shouldComponentUpdate()
//             * componentWillUpdate()
//             * render()
//             * componentDidUpdate()
//      */

//     componentDidUpdate(prevProps, prevState) {

//         if (prevState.selectedState !== this.state.selectedState ||
//             prevState.selectedCountry !== this.state.selectedCountry ||
//             prevState.sortBy !== this.state.sortBy ||
//             prevState.page !== this.state.page)
//         {
//             this.callAPI()
//         }

//         if (prevState.page !== this.state.page) {
//             window.scrollTo({
//                 top: 0,
//                 left: 0,
//                 behavior: 'smooth'
//             })
//         }
//     }

//     /* Unmounting
//         This method is called when a component is being removed from the DOM:
//             * componentWillUnmount()
//      */

//     /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */
//     render () {
//         let stateMenu = []
//         let countryMenu = []

//         // Create an array of X components with 1 for each crime gathered from API call
//         let crimeComponents = this.state.crimes.map(function(crime) {
//                 return (
//                     <ItemSelector item={crime} navigateTo="/crime"/>
//                 );
//             })

    

//         if (this.state.allCountries !== undefined) {
//             stateMenu = this.state.allStates.map((country) => {
//                 return (
//                     <option value={country}>{country}</option>
//                 );
//             })
//         }

//         if (this.state.allStates !== undefined) {
//             countryMenu = this.state.allCountries.map((state) => {
//                 return (
//                     <option value={state}>{state}</option>
//                 );
//             })
//         }

//         return (
//             <div className="container sub-container">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <div className="button btn-group">
//                             <button type="button"
//                                     className={this.state.order === "asc" ? "btn btn-default active" : "btn btn-default"}
//                                     onClick={(e) => this.sort("asc", e)}><i className="fa fa-sort-alpha-asc" aria-hidden="true"/></button>
//                             <button type="button"
//                                     className={this.state.order === "desc" ? "btn btn-default active" : "btn btn-default"}
//                                     onClick={(e) => this.sort("desc", e)}><i className="fa fa-sort-alpha-desc" aria-hidden="true"/></button>
//                         </div>
//                     </div>
//                     <div className="col-md-4">
//                         <label>
//                             <strong>Country:  </strong>
//                         </label><span> </span>
//                         <select value={this.state.selectedCountry} onChange={this.handleCountry}>
//                                 {countryMenu}
//                             </select>
//                     </div>
//                     <div className="col-md-4">
//                         <label>
//                             <strong>State:  </strong>
//                         </label><span> </span>
//                         <select value={this.state.selectedState} onChange={this.handleState}>
//                                 {stateMenu}
//                             </select>
//                     </div>
//                 </div>
//                 {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
//                 { chunk(crimeComponents, 4).map(function(row) {
//                     return (
//                         <div className="row">
//                             { row }
//                         </div>
//                     )
//                 })}
//                 <PageSelector handlePageChange={this.handlePageChange}
//                               handlePrev={this.handlePrev}
//                               handleNext={this.handleNext}
//                               numPages={this.state.numPages}
//                               currentPage={this.state.page}
//                               navigateTo="/crimes"/>
//             </div>
//         );
//     }
// }