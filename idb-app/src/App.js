import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap'; //Example downloading button
import { BrowserRouter, Route, Link } from 'react-router-dom' //linker

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button bsStyle = 'danger'>Roshan is testing this!</Button>
      </div>
    );
  }
}
//npm start to start the app on http://localhost:3000/
//https://www.youtube.com/watch?v=Mn4VLuDpwNw website used
//Made the button with bsStyle

export default App;
