import React from 'react';

import { useFormik } from 'formik';

import { useAuth } from '../../hooks';

import YUP_SCHEMA from './yup.schema';
import './login.scss';

export default function Login() {
  const { onLogin, onGoogleLogin, onGithubLogin } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: YUP_SCHEMA,
    onSubmit: values => {
      onLogin(values);
    },
  });

  return (
    <div className="Login">
      <h1 className="Login__title">Sign in/ Sign up</h1>
      <form className="Login__form" onSubmit={formik.handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="true"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && !!formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="true"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && !!formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}
        <button type="submit">Sign In</button>
      </form>
      <button
        type="button"
        className="Login__button mb15"
        onClick={onGoogleLogin}
      >
        Sign In with GooooooGLE
      </button>
      <button type="button" className="Login__button" onClick={onGithubLogin}>
        Sign In with GitHub
      </button>
    </div>
  );
}
