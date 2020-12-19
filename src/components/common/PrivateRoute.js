import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * - Если маршрут приватный и пользователь залогинен, рендерит компонент
 * - В противном случае рендерит Redirect на redirectTo
 */
function PrivateRoute({ component: Component, redirectTo, ...routeProps }) {
  const user = useSelector(state => state.user.email);
  const isAuthenticated = user ? true : false;

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated ? (
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
