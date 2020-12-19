import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * - Если маршрут ограниченный, и пользователь залогинен, рендерит редирект на /todos
 * - В противном случае рендерит компонент
 */
function PublicRoute({ component: Component, redirectTo, ...routeProps }) {
  const user = useSelector(state => state.user.email);
  const isAuthenticated = user ? true : false;
  return (
    <Route
      {...routeProps}
      render={props =>
        isAuthenticated && routeProps.restricted ? (
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
