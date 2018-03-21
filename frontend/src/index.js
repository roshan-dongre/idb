import React from 'react';
import ReactDOM from 'react-dom';

import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
