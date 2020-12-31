import { React, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useNotes, useAuth } from '../../hooks';
import { useFormik } from 'formik';

import { MenuItem, TextField, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Buttons } from '../../components';

import { ROUTES } from '../../constants/routes';
import { CATEGORIES } from '../../constants/categories';

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: theme.breakpoints.values.sm,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function AddNote() {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();
  const { id } = useParams();
  const { onAddNote, onEditNote, getNote } = useNotes();
  const note = getNote(id);

  useEffect(() => {
    if (!id) {
      return;
    }
    if (!note) {
      history.replace(ROUTES.home);
    }
  }, [note, history, id]);

  const formik = useFormik({
    initialValues: {
      title: note ? note.title : '',
      description: note ? note.description : '',
      category: note ? note.category : '',
    },
    onSubmit: values => {
      if (!id) {
        onAddNote({ ...values, userEmail: user.email });
      } else {
        onEditNote({ id: note.id, ...values });
      }

      history.replace('/notes');
    },
  });

  return (
    <Box className={classes.wrapper}>
      <Typography component="h1" variant="h5">
        {id ? 'Edit note' : 'Add note'}
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
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
          helperText="Please select category"
          required
          {...formik.getFieldProps('category')}
        >
          {CATEGORIES.map(ctgr => (
            <MenuItem key={ctgr} value={ctgr}>
              {ctgr}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="description"
          name="description"
          type="text"
          label="description"
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
