import { React, useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from './hooks';

import { Login, Home } from './components';
import { PrivateRoute, PublicRoute } from './components/common';

import { CURRENT_USER_REQUEST } from './redux/auth/auth.actions';

import * as routes from './constants/routes';
import { NOTES } from './notes';

function App() {
  const dispatch = useDispatch();
  const IS_AUTHENTICATED = useAuth();

  useEffect(() => {
    dispatch(CURRENT_USER_REQUEST());
  }, [dispatch]);

  useEffect(() => {
    if (!IS_AUTHENTICATED) {
      return;
    }
    localStorage.setItem('notes', JSON.stringify(NOTES));
  }, [IS_AUTHENTICATED]);

  return (
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
  );
}

export default App;
