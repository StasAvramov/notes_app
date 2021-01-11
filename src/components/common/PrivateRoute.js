import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import CustomLoader from './CustomLoader';
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
          <CustomLoader />
        ) : !isAuthenticated ? (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location.pathname },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
