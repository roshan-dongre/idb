import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import Home from './Home'
import About from './About'
import Criminals from './Criminals'
import Criminal from './Criminal'
import States from './States'
import Crimes from './Crimes'
import Crime from './Crime'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/About' component={About}/>
      <Route path='/Criminals' component={Criminals}/>
      <Route path='/Crimes' component={Crimes}/>
      <Route path='/States' component={States}/>
    </Switch>
  </main>
)

export default withRouter(Main);
