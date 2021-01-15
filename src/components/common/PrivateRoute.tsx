import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import CustomLoader from './CustomLoader';
import { useAuth } from '../../hooks';

type Props = RouteProps & {
  redirectTo: string;
};

export default function PrivateRoute({
  component: Component,
  redirectTo,
  ...routeProps
}: Props) {
  const { isAuthenticated, isAuthReady } = useAuth();

  return (
    <Route
      {...routeProps}
      render={props =>
        !isAuthReady ? (
          <CustomLoader />
        ) : !isAuthenticated ? (
          <Redirect to={redirectTo} />
        ) : Component ? (
          <Component {...props} />
        ) : null
      }
    />
  );
}
