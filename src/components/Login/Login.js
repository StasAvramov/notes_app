import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import YUP_SCHEMA from './yup.schema';
import { LOGIN_REQUEST } from '../../redux/auth/auth.actions';

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: theme.shadows[15],
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
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
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: YUP_SCHEMA,
    onSubmit: values => {
      const { email } = values;
      const user = { email: email };
      dispatch(LOGIN_REQUEST(user));
    },
  });

  return (
    <Container component="main" maxWidth="md" className={classes.container}>
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
            name="email"
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
            name="password"
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
    </Container>
  );
}
