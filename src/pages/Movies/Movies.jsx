import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchBar } from '../../components';
import MoviesList from '../../components/MoviesList/MoviesList';
import { loaderOptions } from '../../constants';
import { fetchSearchByWord } from '../../utils/fetchAPI';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const query = searchParams.get('query') ?? '';
  const [searchQuery, setSearchQuery] = useState(query);

  const searchedMovies = useQuery({
    queryKey: [searchQuery],
    queryFn: fetchSearchByWord,
    staleTime: 1000 * 60 * 60,
  });
  const movies = searchedMovies?.data?.results;
  const loading = searchedMovies?.isFetching;
  const error = searchedMovies?.error;

  const location = useLocation();

  const handleInputChange = ({ target }) => {
    setSearchParams(target.value ? { query: target.value } : {});
  };

  const handleFormSubmit = () => {
    setSearchQuery(query);
  };

  return (
    <>
      <div>
        <SearchBar value={query} onChange={handleInputChange} onSubmit={handleFormSubmit} />
      </div>
      {error && <p>{error.message}</p>}
      {loading && <ColorRing {...loaderOptions} />}
      {movies?.length === 0 && <p>Nothing...</p>}
      {movies?.length && <MoviesList movies={movies} location={location} />}
    </>
  );
};

export default Movies;
