import React from 'react';

import { useFormik } from 'formik';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, TextField, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../../hooks';

import YUP_SCHEMA from './yup.schema';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

export default function Login() {
  const classes = useStyles();
  const { onLogin } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: YUP_SCHEMA,
    onSubmit: values => {
      onLogin({ email: values.email });
    },
  });

  return (
    <Box className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          type="email"
          label="Email Address *"
          variant="outlined"
          margin="normal"
          fullWidth
          autoComplete="true"
          autoFocus
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.errors.email}
          {...formik.getFieldProps('email')}
        />

        <TextField
          id="password"
          type="password"
          label="Password *"
          variant="outlined"
          margin="normal"
          fullWidth
          autoComplete="true"
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.errors.password}
          {...formik.getFieldProps('password')}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
}
