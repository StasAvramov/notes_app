import React from 'react';
import './styles.scss';

export default function CustomInput({
  id = 'id',
  type = 'text',
  placeholder = '',
  ...restProps
}) {
  return (
    <input
      className="input"
      id={id}
      type={type}
      placeholder={`Enter your ${id}`}
      autoComplete="true"
      {...restProps}
    />
  );
}
