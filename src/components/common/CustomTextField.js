import React from 'react';

import { TextField } from '@material-ui/core';

export default function CustomTextField({ fieldTitle, ...restProps }) {
  return (
    <TextField
      id={fieldTitle}
      name={fieldTitle}
      label={fieldTitle}
      {...restProps}
    />
  );
}
