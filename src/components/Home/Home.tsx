import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Category from '../Category';
import { CustomLoader } from '../common';
import Notes from '../Notes';

import { ROUTES } from '../../constants/routes';
import { useAuth, useNotes } from '../../hooks';
import './home.scss';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { isNotesReady, getNotes, notes } = useNotes();

  useEffect(() => {
    if (isAuthenticated && !isNotesReady) {
      getNotes();
    }
  }, [isAuthenticated, getNotes, isNotesReady]);

  return (
    <div className="Home">
      {notes.length > 0 && <Category />}
      {isNotesReady ? <Notes /> : <CustomLoader />}
      <button className="Home__button">
        <Link to={ROUTES.add}>Add note</Link>
      </button>
    </div>
  );
}
