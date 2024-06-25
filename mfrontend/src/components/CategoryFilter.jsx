// CategoryFilter.js
import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilter({ categories, setCategory }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setCategory(category.id)}
          type="button"
        >
          {category.name}
        </button>
      ))}
      <button onClick={() => setCategory(null)} type="button">
        All
      </button>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
