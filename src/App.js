import { React, useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useAuth, useNotes } from './hooks';

import { Login, Content } from './components';
import { PrivateRoute, PublicRoute } from './components/common';

import { Container } from '@material-ui/core';

import { ROUTES } from './constants/routes';
import { NOTES } from './notes';

function App() {
  const { isAuthenticated, getCurrentUser } = useAuth();
  const { notes, getNotes } = useNotes();

  useEffect(() => {
    getCurrentUser();
    getNotes();
  }, [getCurrentUser, getNotes]);

  useEffect(() => {
    if (isAuthenticated) {
      if (notes) {
        return;
      }
      localStorage.setItem('notes', JSON.stringify(NOTES));
    }
  }, [isAuthenticated, notes]);

  return (
    <Container maxWidth="md">
      <Switch>
        <PublicRoute
          exact
          restricted
          path={ROUTES.login}
          component={Login}
          redirectTo={ROUTES.home}
        />
        <PrivateRoute
          exact
          path={[
            ROUTES.home,
            ROUTES.details,
            ROUTES.category,
            ROUTES.add,
            ROUTES.edit,
          ]}
          component={Content}
          redirectTo={ROUTES.login}
        />
        <Redirect to={ROUTES.login} />
      </Switch>
    </Container>
  );
}

export default App;
