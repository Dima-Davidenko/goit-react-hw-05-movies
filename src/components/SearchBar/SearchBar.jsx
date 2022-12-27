import React from 'react';
import css from './SearchBar.module.css';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, onSubmit }) => {
  const handleFormSubmit = evt => {
    evt.preventDefault();
    onSubmit();
  };
  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
