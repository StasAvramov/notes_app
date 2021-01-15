import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../hooks';

type Props = RouteProps & {
  redirectTo: string;
  restricted: boolean;
};

export default function PublicRoute({
  component: Component,
  redirectTo,
  ...routeProps
}: Props) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated && routeProps.restricted ? (
          <Redirect to={redirectTo} />
        ) : Component ? (
          <Component {...props} />
        ) : null
      }
    />
  );
}
