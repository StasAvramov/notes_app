import * as Yup from 'yup';

const YUP_SCHEMA = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .required('Password is required')
    .matches(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,}$/,
      'Must be 8 characters or more and contain at least 1 digit, 1 uppercase and 1 lowercase letter',
    ),
});

export default YUP_SCHEMA;
