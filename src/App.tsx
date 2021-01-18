import React from 'react';
import { useEffect } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import { useAuth } from './hooks';

import { Login, Header, Home, ActionNote, ViewNote } from './components';
import { PrivateRoute, PublicRoute } from './components/common';

import { Container } from '@material-ui/core';

import { ROUTES } from './constants/routes';
import { onFirebaseAuthStateChange } from './services/firebase.auth.service';

export default function App() {
  const { isAuthenticated, getCurrentUser } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTES.login;

  useEffect(() => {
    const unsubscribe = onFirebaseAuthStateChange(getCurrentUser);
    return () => {
      unsubscribe();
    };
  }, [getCurrentUser]);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     getCurrentUser();
  //   }
  // }, [isAuthenticated, getCurrentUser]);

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
