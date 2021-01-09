import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks';

/**
 * - Если маршрут приватный и пользователь залогинен, рендерит компонент
 * - В противном случае рендерит Redirect на redirectTo
 */
export default function PrivateRoute({
  component: Component,
  redirectTo,
  ...routeProps
}) {
  const { isAuthenticated, isAuthReady } = useAuth();

  return (
    <Route
      {...routeProps}
      render={props =>
        !isAuthReady ? (
          <div>Loading</div>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location.pathname },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
