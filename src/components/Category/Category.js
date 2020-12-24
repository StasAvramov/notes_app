import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';

import { CATEGORIES } from '../../constants/categories';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
    maxWidth: '450px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function Category() {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const handleChange = event => {
    setCategory(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink id="category">
        Category
      </InputLabel>
      <Select
        labelId="category"
        id="category"
        value={category}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
      >
        <MenuItem value="">
          <em>Sort by Category</em>
        </MenuItem>
        {CATEGORIES.map(ctgr => (
          <MenuItem key={ctgr} value={ctgr}>
            {ctgr}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
