import { React, useEffect } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import { useAuth, useNotes } from './hooks';

import { Login, Header, Home, ActionNote, ViewNote } from './components';
import { PrivateRoute, PublicRoute } from './components/common';

import { Container } from '@material-ui/core';

import { ROUTES } from './constants/routes';
import { NOTES } from './notes';

function App() {
  const { isAuthenticated, getCurrentUser } = useAuth();
  const { notes, getNotes } = useNotes();

  const location = useLocation();
  let isLoginPage = location.pathname === ROUTES.login;

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
      {!isLoginPage && <Header />}
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
          path={[ROUTES.home, ROUTES.category]}
          component={Home}
          redirectTo={ROUTES.login}
        />
        <PrivateRoute
          exact
          path={[ROUTES.add, ROUTES.edit]}
          component={ActionNote}
          redirectTo={ROUTES.login}
        />
        <PrivateRoute
          exact
          path={ROUTES.details}
          component={ViewNote}
          redirectTo={ROUTES.login}
        />
        <Redirect to={ROUTES.home} />
      </Switch>
    </Container>
  );
}

export default App;
