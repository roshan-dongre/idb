import React from 'react';
import ReactDOM from 'react-dom';

import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css'
import App from './App';

import registerServiceWorker from './registerServiceWorker';
render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
