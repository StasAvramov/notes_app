import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';

import { CATEGORIES } from '../../constants/categories';
import { ROUTES } from '../../constants/routes';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
    maxWidth: '450px',
  },
  select: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function Category() {
  const classes = useStyles();
  // const [category, setCategory] = useState('');

  // const handleChange = event => {
  //   setCategory(event.target.value);
  // };

  const formik = useFormik({
    initialValues: {
      category: '',
    },
    onSubmit: values => {
      // history.replace('/notes');
    },
  });

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="category">
        Category
      </InputLabel>
      <Select
        labelId="category"
        id="category"
        displayEmpty
        className={classes.select}
        {...formik.getFieldProps('category')}
      >
        <MenuItem value="" to={ROUTES.home} component={Link}>
          <em>Sort by Category</em>
        </MenuItem>
        {CATEGORIES.map(ctgr => (
          <MenuItem
            key={ctgr}
            value={ctgr}
            to={ROUTES.dynamic.category(ctgr.toLowerCase())}
            component={Link}
          >
            {ctgr}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
