import React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from '../common';
import { Home, AddNote, EditNote, Header, ViewNote } from '../../components';

import { ROUTES } from '../../constants/routes';

export default function Content() {
  return (
    <>
      <Header />
      <Switch>
        <PrivateRoute
          exact
          path={ROUTES.home}
          component={Home}
          redirectTo={ROUTES.login}
        />
        <PrivateRoute
          exact
          path={ROUTES.add}
          component={AddNote}
          redirectTo={ROUTES.login}
        />
        <PrivateRoute
          exact
          path={ROUTES.edit}
          component={EditNote}
          redirectTo={ROUTES.login}
        />
        <PrivateRoute
          exact
          path={ROUTES.details}
          component={ViewNote}
          redirectTo={ROUTES.login}
        />
        <PrivateRoute
          exact
          path={ROUTES.category}
          component={Home}
          redirectTo={ROUTES.login}
        />
      </Switch>
    </>
  );
}
