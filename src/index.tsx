import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { ErrorBoundary } from './components/common';

import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/style.css';

import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
