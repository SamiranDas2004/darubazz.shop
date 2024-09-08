import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import

import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>  <App /></Provider>
  
  </BrowserRouter>
);
