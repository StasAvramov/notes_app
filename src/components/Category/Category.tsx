import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';

import { CATEGORIES } from '../../constants/categories';
import { ROUTES } from '../../constants/routes';
import { CategoryType } from '../../types/main';
import { capitalize } from '../../services/notes.service';

type UseParamsCategoryType = {
  category: string;
};

export default function Category() {
  const [categorySelect, setCategorySelect] = useState<CategoryType>('');

  const handleChange = (event: ChangeEvent<{ value: unknown }>): void => {
    setCategorySelect(event.target.value as CategoryType);
  };
  const { category } = useParams<UseParamsCategoryType>();

  useEffect(() => {
    if (category && CATEGORIES.includes(capitalize(category))) {
      setCategorySelect(capitalize(category));
    }
  }, [category, setCategorySelect]);

  return (
    <FormControl /*className={classes.formControl}*/>
      <InputLabel shrink id="select-label">
        Category
      </InputLabel>
      <Select
        labelId="select-label"
        id="category"
        value={categorySelect}
        onChange={handleChange}
        displayEmpty
        /*className={classes.select}*/
      >
        <MenuItem value="">
          <Link
            to={ROUTES.home}
            // className={classes.link}
          >
            All
          </Link>
        </MenuItem>
        {CATEGORIES.map(category => (
          <MenuItem value={category} key={category}>
            <Link
              /*className={classes.link}*/
              to={ROUTES.dynamic.category(category.toLowerCase())}
            >
              {category}
            </Link>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
