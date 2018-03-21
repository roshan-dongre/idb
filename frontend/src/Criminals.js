// import React from 'react'
// import { Link } from 'react-router-dom'
// import {Button, Form, FormControl, FormGroup, DropdownButton, MenuItem, Pagination, OverlayTrigger, Popover} from 'react-bootstrap'
// import Highlighter from 'react-highlight-words'
// import './Header.css'
// import styles from './Criminals.css'
// import './ModelStyle.css'
    
// var axios = require('axios');

// {/* Responsible for all styling on the page */}
// var imageStyles = {
//     width: '500px',
//     height: '400px'
// }

// var dropdownStyle = {
//     margin: '10px',
//     backgroundColor: '#2b2b2b',
//     borderColor: '#2b2b2b',
//     color: 'white',
// }


// {/* Used to split the criminal data so there is 3 per row */}
// function splitarray(input, spacing) {
//     var output = [];

//     for (var i = 0; i < input.length; i += spacing) {
//         output[output.length] = input.slice(i, i + spacing);
//     }
//     return output;
// }

// class Criminals extends React.Component {
//     constructor(props) {
//         super(props);
//         // this.handleSelectSort = this.handleSelectSort.bind(this);
//         // this.handleSelectDirection = this.handleSelectDirection.bind(this);
//         // this.handleSelect = this.handleSelect.bind(this);
//         // this.handleSelectFilter = this.handleSelectFilter.bind(this);
//         // this.handleSearchChange = this.handleSearchChange.bind(this);
//         // this.handleResetFilter = this.handleResetFilter.bind(this);
//         // this.updateItems = this.updateItems.bind(this);

//         this.state = this.getInitialState();
//         this.updateItems();
//     }

//     getInitialState() {
//         return {
//             search_string: '',
//             criminals: [],
//             criminalsGrouped: [],
//             numPages: 1,
//             activePage: 1,
//             resultsPerPage: 6,
//             orderBy: 'name',
//             orderDirection: 'asc',
//             q: {
//                 'order_by': [{"field": "name", "direction": "asc"}],
//                 'filters': []
//             }
//         };
//     }
    
//     //* Rerenders/updates the page to get the new data triggered by pagination, sorting, etc */
//     updateItems() {
//         var url = 'http://ontherun.me:5000/api/criminals';
//         var params = {
//             results_per_page: this.state.resultsPerPage,
//             page: this.state.activePage,
//             q: JSON.stringify(this.state.q),
//         };
//         /*
//         if (this.state.search_string.length > 0) {
//             url = 'http://marvelus.me/api/search/criminal';
//             params['query'] = this.state.search_string;
//         }*/
//         axios.get(url, {
//             params: params
//         }).then(res => {
//             this.state.numPages = res.data.total_pages;
//             console.log(res.data.criminals);
//             const criminals = res.data.criminals.map(criminal => criminal);
// 	        const criminalsGrouped = splitarray(criminals, 3)
// 	        this.setState({criminalsGrouped});
//         });
//     }

  

//     render() {
//         return (    
//             <div className="container" styles="margin-top:100px;">
                                   
//                 {/* Go through and display 6 criminals per page */}
//                 {this.state.criminalsGrouped.length == 0 || !this.state.criminalsGrouped ? null :
//                     this.state.criminalsGrouped.map(CriminalsList =>
//                         !CriminalsList ? null :
//                         <div className="row">
//                         {CriminalsList.map((criminal, i) =>
//                             <div className="col-sm-4">
//                                 <Link to={"/criminals/" + criminals.id}>
//                                     <div className="panel">

//                                         <div className="panel-heading">
//                                             <div>
//                                                {/* For criminal search -- highlights the word found */}
//                                                 <Highlighter
//                                                 highlightClassName={styles.Highlight}
//                                                 searchWords={this.state.search_string.split(" ")}
//                                                 autoEscape={true}
//                                                 textToHighlight={criminal.name}
//                                                 /> 
//                                             </div>
//                                          </div>

                                             

//                                     </div>
                                   
//                                 </Link>
//                             </div>
//                         )}
//                         </div>)

//                 }

            
//             {/* Display the pagination bar */}
//             <div className='text-center'>
//                 {!this.state.numPages
//                     ? null
//                     : <Pagination
//                         bsSize='large'
//                         prev
//                         next
//                         first
//                         last
//                         ellipsis
//                         boundaryLinks
//                         items={this.state.numPages}
//                         maxButtons={10}
//                         activePage={this.state.activePage}
//                         onSelect={this.handleSelect}/>
//                 }
//             </div>
//           </div>
//         );
//     }
// }

// export default Criminals