import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import { loaderOptions } from '../../constants';
import { fetchPopular } from '../../utils/fetchAPI';
import MoviesList from '../MoviesList/MoviesList';

const Trending = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetchPopular()
      .then(({ results }) => {
        setMovies(results);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <ColorRing {...loaderOptions} />}
      {movies?.length && <MoviesList movies={movies} location={location} />}
    </>
  );
};

export default Trending;
