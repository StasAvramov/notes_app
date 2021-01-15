import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { ErrorBoundary } from './components/common';

// const firebaseConfig = {
//   apiKey: "AIzaSyD816F_RsLNULSgNRV7BUmkKgJprQGeu-I",
//   authDomain: "notes-react-app-cd4a7.firebaseapp.com",
//   projectId: "notes-react-app-cd4a7",
//   storageBucket: "notes-react-app-cd4a7.appspot.com",
//   messagingSenderId: "560531965265",
//   appId: "1:560531965265:web:099ac5dba034152d8cbf70"
// };
// firebase.initializeApp(firebaseConfig);

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
