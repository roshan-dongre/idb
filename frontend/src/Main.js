import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import Home from './Home'
//import About from './About'
//import Criminals from './Criminals'
//import CriminalsInstance from './CriminalsInstance'
//import Crimes from './Crimes'
//import CrimesInstance from './CrimesInstance'
//import States from './States'
//import StatesInstance from './StatesInstance'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      
      /*<Route path='/about' component={About}/>

      <Route path='/criminals' component={Criminals}/>
      <Route path='/criminals/:criminalsID' component={CriminalsInstance}/>

      <Route path='/states' component={States}/>
      <Route path='/states/:statesID' component={StatesInstance}/>

      <Route path='/crimes' component={Crimes}/>
      <Route path='/crimes/:crimesID' component={CrimesInstance}/>*/
    </Switch>
  </main>
)

export default withRouter(Main);