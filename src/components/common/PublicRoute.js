import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks';

/**
 * - Если маршрут ограниченный, и пользователь залогинен, рендерит редирект на /todos
 * - В противном случае рендерит компонент
 */
function PublicRoute({ component: Component, redirectTo, ...routeProps }) {
  const IS_AUTHENTICATED = useAuth();
  return (
    <Route
      {...routeProps}
      render={props =>
        IS_AUTHENTICATED && routeProps.restricted ? (
          <Redirect to={redirectTo} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};

export default PublicRoute;
