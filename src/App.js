import { React, useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useAuth, useNotes } from './hooks';

import { Login, Home, AddNote, EditNote } from './components';
import { PrivateRoute, PublicRoute } from './components/common';

import * as routes from './constants/routes';
import { NOTES } from './notes';

function App() {
  const { isAuthenticated, onGetCurrentUser } = useAuth();
  const { notes, getNotes } = useNotes();

  useEffect(() => {
    onGetCurrentUser();
    getNotes();
  }, [onGetCurrentUser, getNotes]);

  useEffect(() => {
    if (isAuthenticated) {
      if (notes) {
        return;
      }
      localStorage.setItem('notes', JSON.stringify(NOTES));
    }
  }, [isAuthenticated, notes]);

  return (
    <Switch>
      <PrivateRoute
        exact
        path={routes.HOME}
        component={Home}
        redirectTo={routes.LOGIN}
      />
      <PrivateRoute
        exact
        path={routes.NOTE_CREATE}
        component={AddNote}
        redirectTo={routes.LOGIN}
      />
      <PrivateRoute
        exact
        path={routes.NOTE_UPDATE}
        component={EditNote}
        redirectTo={routes.LOGIN}
      />
      <PrivateRoute
        exact
        path={routes.NOTE_DETAILS}
        component={AddNote}
        redirectTo={routes.LOGIN}
      />
      <PublicRoute
        exact
        restricted
        path={routes.LOGIN}
        redirectTo={routes.HOME}
        component={Login}
      />
      <Redirect to={routes.LOGIN} />
    </Switch>
  );
}

export default App;
