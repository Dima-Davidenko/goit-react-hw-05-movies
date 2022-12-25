import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { SearchBar } from '../../components';
import { fetchSearchByWord } from '../../utils/fetchAPI';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams('');
  const query = searchParams.get('query') ?? '';
  const isFirstLoading = useRef(true);
  const location = useLocation();

  useEffect(() => {
    if (isFirstLoading.current && query) {
      setLoading(true);
      fetchSearchByWord(searchParams.get('query'))
        .then(({ results }) => setMovies(results))
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    }
    isFirstLoading.current = false;
  }, [query, searchParams]);

  useEffect(() => {
    if (!query) setMovies(null);
  }, [query]);

  const handleInputChange = ({ target }) => {
    setSearchParams(target.value ? { query: target.value } : {});
  };

  const handleFormSubmit = () => {
    setLoading(true);
    fetchSearchByWord(searchParams.get('query'))
      .then(({ results }) => setMovies(results))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        <SearchBar value={query} onChange={handleInputChange} onSubmit={handleFormSubmit} />
      </div>
      {movies?.length === 0 && <p>Nothing...</p>}
      {movies?.length > 0 && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Movies;
