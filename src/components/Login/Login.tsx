import React from 'react';

import { useFormik } from 'formik';
import { CustomInput } from '../common/CustomInput';
import { CustomButton } from '../common/CustomButton';
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
      <form className="Login__form mb15" onSubmit={formik.handleSubmit}>
        <CustomInput
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && !!formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}
        <CustomInput
          id="password"
          type="password"
          autoComplete="true"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && !!formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}
        <CustomButton type="submit">Sign In</CustomButton>
      </form>
      <CustomButton type="button" onClick={onGoogleLogin}>
        Sign In with Google
      </CustomButton>
      <CustomButton type="button" onClick={onGithubLogin}>
        Sign In with GitHub
      </CustomButton>
    </div>
  );
}
