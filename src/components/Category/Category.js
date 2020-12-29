import { React, forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';

import { CATEGORIES } from '../../constants/categories';

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

// const AsLink = forwardRef((props, ref) => <Link ref={ref} {...props} />);

export default function Category() {
  const classes = useStyles();
  const [category, setCategory] = useState('');

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
        className={classes.select}
      >
        <MenuItem value="" to={'/notes'} component={Link}>
          <em>Sort by Category</em>
        </MenuItem>
        {CATEGORIES.map(ctgr => (
          <MenuItem
            key={ctgr}
            value={ctgr}
            to={`/notes/${ctgr}`}
            component={Link}
          >
            {ctgr}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
