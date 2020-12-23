import { React, useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useAuth } from './hooks';

import { Login, Home } from './components';
import { PrivateRoute, PublicRoute } from './components/common';

import * as routes from './constants/routes';
import { NOTES } from './notes';

function App() {
  const { isAuthenticated, onGetCurrentUser } = useAuth();

  useEffect(() => {
    onGetCurrentUser();
  }, [onGetCurrentUser]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('notes', JSON.stringify(NOTES));
    }
  }, [isAuthenticated]);

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
