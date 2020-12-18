import React from 'react';
import { useFormik } from 'formik';
import YUP_SCHEMA from './yup.schema';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    padding: '12px 16px',
  },
  error: {
    color: theme.palette.error.dark,
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: YUP_SCHEMA,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email Address *"
          variant="outlined"
          margin="normal"
          fullWidth
          autoComplete="true"
          autoFocus
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={classes.error}>{formik.errors.email}</div>
        ) : null}
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password *"
          variant="outlined"
          margin="normal"
          fullWidth
          autoComplete="true"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={classes.error}>{formik.errors.password}</div>
        ) : null}
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
    </div>
  );
}
