import { React } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const { category } = useParams();

  const capitalize = s => {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  };
  const formik = useFormik({
    initialValues: {
      category: capitalize(category),
    },
  });

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="category">
        Select category
      </InputLabel>
      <Select
        labelId="category"
        id="category"
        displayEmpty
        className={classes.select}
        {...formik.getFieldProps('category')}
      >
        <MenuItem value="" to={ROUTES.home} component={Link}>
          All
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
