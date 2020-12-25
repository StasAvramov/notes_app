import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNotes, useAuth } from '../../hooks';
import MenuItem from '@material-ui/core/MenuItem';
import Header from '../Header';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CATEGORIES } from '../../constants/categories';

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: theme.shadows[15],
  },
  paper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: theme.breakpoints.values.sm,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5, 2),
  },
}));

export default function AddNote() {
  const classes = useStyles();
  const history = useHistory();
  const { onAddNote } = useNotes();
  const { user } = useAuth();

  function createNote(params) {
    return {
      ...params,
      id: uuidv4(),
      createdAt: new Date().toLocaleString(),
      updatedAt: '',
    };
  }

  function onCancel() {
    history.replace('/notes');
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
    },
    onSubmit: values => {
      const newNote = createNote({ ...values, userEmail: user.email });
      onAddNote(newNote);
      history.replace('/notes');
    },
  });

  return (
    <>
      <Header />
      <Container component="main" maxWidth="md" className={classes.container}>
        <Box className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add note
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
              autoFocus
              required
              {...formik.getFieldProps('title')}
            />

            <TextField
              id="category"
              name="category"
              select
              fullWidth
              label="Select category"
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
            <Box>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add note
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}
