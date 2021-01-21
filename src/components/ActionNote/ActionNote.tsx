import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import { MenuItem, TextField, Typography, Box } from '@material-ui/core';

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
    <Box className="wrapper">
      <Typography component="h1" variant="h5">
        {id ? 'Edit note' : 'Add note'}
      </Typography>
      <form className="form" onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          type="text"
          label="Title"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          {...formik.getFieldProps('title')}
        />

        <TextField
          id="category"
          select
          fullWidth
          label="Category"
          required
          {...formik.getFieldProps('category')}
        >
          {CATEGORIES.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="description"
          type="text"
          label="Description"
          variant="outlined"
          margin="normal"
          multiline
          rowsMax={20000}
          fullWidth
          autoComplete="true"
          required
          {...formik.getFieldProps('description')}
        />
        <Buttons />
      </form>
    </Box>
  );
}
