import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from './components/Login';
import Container from '@material-ui/core/Container';

import * as routes from './constants/routes';

function App() {
  return (
    <Container component="main" maxWidth="sm">
      <Route path={routes.LOGIN}>
        <Login />
      </Route>
      <Redirect to={routes.LOGIN} />
    </Container>
  );
}

export default App;
