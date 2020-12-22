import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks';

/**
 * - Если маршрут приватный и пользователь залогинен, рендерит компонент
 * - В противном случае рендерит Redirect на redirectTo
 */
function PrivateRoute({ component: Component, redirectTo, ...routeProps }) {
  const IS_AUTHENTICATED = useAuth();
  return (
    <Route
      {...routeProps}
      render={props =>
        IS_AUTHENTICATED ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoute;
