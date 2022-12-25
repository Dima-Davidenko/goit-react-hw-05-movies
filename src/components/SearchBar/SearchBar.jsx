import React from 'react';

const SearchBar = ({ value, onChange, onSubmit }) => {
  const handleFormSubmit = evt => {
    evt.preventDefault();
    onSubmit();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
