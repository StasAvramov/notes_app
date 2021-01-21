import React from 'react';
import { useEffect } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import { useAuth } from './hooks';

import { Login, Header, Home, ActionNote, ViewNote } from './components';
import { PrivateRoute, PublicRoute } from './components/common';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ROUTES } from './constants/routes';
import { onFirebaseAuthStateChange } from './services/firebase.auth.service';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
  },
  // button: {
  //   position: 'fixed',
  //   bottom: theme.spacing(0),
  //   width: '100%',
  //   maxWidth: theme.breakpoints.values.md,
  //   margin: theme.spacing(0, 'auto'),
  //   borderRadius: theme.spacing(0),
  //   padding: theme.spacing(2, 4.75),
  //   [theme.breakpoints.up('md')]: {
  //     position: 'static',
  //     maxWidth: '450px',
  //   },
  // },
}));

export default function App() {
  const classes = useStyles();
  const { getCurrentUser } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTES.login;

  useEffect(() => {
    const unsubscribe = onFirebaseAuthStateChange(getCurrentUser);
    return () => {
      unsubscribe();
    };
  }, [getCurrentUser]);

  return (
    <>
      {!isLoginPage && <Header />}
      <Container maxWidth="md" className={classes.container} component={'main'}>
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
    </>
  );
}
