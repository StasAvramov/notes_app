import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { useNotes } from '../../hooks';
import { ROUTES } from '../../constants/routes';
import './buttons.scss';

type UseParamsIdType = {
  id: string;
};

export default function Buttons() {
  const match = useRouteMatch<UseParamsIdType>();
  const { onDeleteNote } = useNotes();

  const IS_ADD_VIEW = !match.params.id;
  const IS_EDIT_VIEW = match.path.includes('edit');
  const NOTE_ID = match.params.id;

  const handleClick = () => {
    onDeleteNote(NOTE_ID);
  };

  return (
    <div className="Buttons">
      <button type="button" className="Buttons__button">
        <Link to={ROUTES.home}>
          {IS_ADD_VIEW || IS_EDIT_VIEW ? 'Cancel' : 'Back'}
        </Link>
      </button>

      {IS_ADD_VIEW && (
        <button type="submit" className="Buttons__button">
          Add note
        </button>
      )}

      {!IS_ADD_VIEW && (
        <>
          {IS_EDIT_VIEW ? (
            <button type="submit" className="Buttons__button">
              Save
            </button>
          ) : (
            <button type="submit" className="Buttons__button">
              <Link to={ROUTES.dynamic.edit(NOTE_ID)}>Edit</Link>
            </button>
          )}

          <button className="Buttons__button delete" onClick={handleClick}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
