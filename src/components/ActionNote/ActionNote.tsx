import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import { Buttons } from '../index';

import { useNotes, useAuth } from '../../hooks';
import { ROUTES } from '../../constants/routes';
import { CATEGORIES } from '../../constants/categories';
import { NoteType, Nullable } from '../../types/main';
import './action_note.scss';

type FormikValuesType = Pick<NoteType, 'category' | 'title' | 'description'>;
type UseParamsIdType = {
  id: string;
};

export default function AddNote() {
  const history = useHistory();
  const { id } = useParams<UseParamsIdType>();
  const { user } = useAuth();
  const {
    onAddNote,
    onEditNote,
    getNoteById,
    isNotesReady,
    getNotes,
  } = useNotes();
  const [note, setNote] = useState<Nullable<NoteType>>(null);

  useEffect(() => {
    //if !id === Add Note Page
    if (!id) {
      return;
    }
    //if Edit Note Page => request for notes
    if (!isNotesReady) {
      getNotes();
      return;
    }
    //if note with id from useParams is in the state => setNote()
    if (getNoteById(id)) {
      setNote(getNoteById(id));
      return;
    }
    //redirect to home if note with id doesn't exist
    history.replace(ROUTES.home);
  }, [history, id, note, isNotesReady, getNoteById, getNotes]);

  const formik = useFormik({
    initialValues: {
      title: note ? note.title : '',
      description: note ? note.description : '',
      category: note ? note.category : '',
    },
    enableReinitialize: true,
    onSubmit: (values: FormikValuesType) => {
      if (!id) {
        onAddNote({ ...values, userEmail: user.email });
      } else {
        if (
          note &&
          note.category === values.category &&
          note.title === values.title &&
          note.description === values.description
        ) {
          alert('There is no changes to save!');
          return;
        }
        onEditNote({ id: note ? note.id : '', fieldsToUpdate: values });
      }

      history.replace('/notes');
    },
  });

  return (
    <div className="Action">
      <h1>{id ? 'Edit note' : 'Add note'}</h1>
      <form className="Action__form" onSubmit={formik.handleSubmit}>
        <input
          className="title"
          id="title"
          type="text"
          placeholder="Enter note title"
          required
          {...formik.getFieldProps('title')}
        />

        <select
          className="category"
          id="category"
          required
          {...formik.getFieldProps('category')}
        >
          {CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <textarea
          className="description"
          placeholder="Enter note description"
          id="description"
          required
          {...formik.getFieldProps('description')}
        />
        <Buttons />
      </form>
    </div>
  );
}
