import React, { Component } from 'react';
import logo from './logo.svg';
import 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import Criminals from './Criminals';
import States from './States';
import Crimes from './Crimes';
import Criminal from './Criminal';
import State from './State';
import Crime from './Crime';
import About from './About';
import SearchResults from './SearchResults';
import Result from './Result';
import Visualization from './Visualization';

export default class App extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            apiUrl: "http://api.ontherun.me"
        }
    }

    componentDidMount() {
        this.callAPI()
    }

    /*Gets the API info for the search bar */
    
    callAPI(){
        let self = this
        axios.all([
            axios.get(self.state.apiUrl+"/criminals"),
            axios.get(self.state.apiUrl+"/states"),
            axios.get(self.state.apiUrl+"/crimes")
        ])
            .then(axios.spread((criminals, states, crimes) => {
                // console.log(criminals)
                let allRecords = criminals.data.results.concat(states.data.results).concat(crimes.data.results)
                this.setState({allData: allRecords})
            }))
            .catch((error) => {
                console.log(error)
            });
    }

/*Routing for each page done here */

  render() {
    return (
      <div className="App">
        <Header allData={this.state.allData}/>
              <div className="App">
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/About" component={About} />
                      <Route exact path="/Criminals" component={Criminals} />
                      <Route exact path="/Criminal" component={Criminal} />
                      <Route exact path="/States" component={States} />
                      <Route exact path="/State" component={State} />
                      <Route exact path="/Crimes" component={Crimes} />
                      <Route exact path="/Crime" component={Crime} />
                      <Route exact path="/SearchResults" component={SearchResults} />
                      <Route exact path="/Result" component={Result} />
                      <Route exact path="/Visualization" component={Visualization} />
                      <Route component={NotFound} />
                  </Switch>
              </div>
      </div>
    );
  }
}
