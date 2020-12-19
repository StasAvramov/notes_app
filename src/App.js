import { React, useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Login from './components/Login';
import Home from './components/Home';
import { PrivateRoute, PublicRoute } from './components/common';
import Container from '@material-ui/core/Container';

import authActions from './redux/auth/auth.actions';
import * as routes from './constants/routes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.currentUserRequest());
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="sm">
      <Switch>
        <PrivateRoute
          exact
          path={routes.HOME}
          component={Home}
          redirectTo={routes.LOGIN}
        />
        <PublicRoute
          exact
          restricted
          path={routes.LOGIN}
          redirectTo={routes.HOME}
          component={Login}
        />
        <Redirect to={routes.LOGIN} />
      </Switch>
    </Container>
  );
}

export default App;
