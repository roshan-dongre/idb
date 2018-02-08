import React, { Component } from 'react';
import logo from './favicon.png';
import './App.css';
import { Button } from 'react-bootstrap'; //Example downloading button
import { BrowserRouter, Route, Link } from 'react-router-dom' //linker

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-primary">
          <a className="navbar-brand mb-0 h1" href="#">
            <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" /><t>  OnTheRun</t>
          </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
              </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
          </form>
          </div>
      </nav>
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button bsStyle = 'primary'>Roshan is testing this!</Button>
      </div>
    );
  }
}
//npm start to start the app on http://localhost:3000/
//https://www.youtube.com/watch?v=Mn4VLuDpwNw website used
//Made the button with bsStyle

export default App;
