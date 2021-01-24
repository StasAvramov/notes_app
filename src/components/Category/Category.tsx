import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { CATEGORIES } from '../../constants/categories';
import { ROUTES } from '../../constants/routes';
import { CategoryType } from '../../types/main';
import { capitalize } from '../../services/notes.service';
import './category.scss';

type UseParamsCategoryType = {
  category: string;
};

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('');
  const [isListOpen, setIsListOpen] = useState(false);

  const { category } = useParams<UseParamsCategoryType>();

  const handleToggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleCategorySelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setIsListOpen(false);
  };

  useEffect(() => {
    if (category && CATEGORIES.includes(capitalize(category))) {
      setSelectedCategory(capitalize(category));
    }
  }, [category, setSelectedCategory]);

  return (
    <div className="Category">
      <button
        type="button"
        className="Category__header"
        onClick={handleToggleList}
      >
        <p>{category ? capitalize(category) : 'Please select category'}</p>
      </button>
      <div role="list" className={isListOpen ? 'List List__open' : 'List'}>
        <button
          type="button"
          className="List__button"
          key="all"
          value="All"
          onClick={handleCategorySelect}
        >
          <Link to={ROUTES.home}>All</Link>
        </button>
        {CATEGORIES.map(category => (
          <button
            type="button"
            className="List__button"
            key={category}
            value={category}
            onClick={handleCategorySelect}
          >
            <Link to={ROUTES.dynamic.category(category.toLowerCase())}>
              {category}
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
}
