import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import { loaderOptions } from '../../constants';
import { fetchPopular } from '../../utils/fetchAPI';
import MoviesList from '../MoviesList/MoviesList';

const Trending = () => {
  const trendingMovies = useQuery({
    queryKey: ['trending'],
    queryFn: fetchPopular,
    staleTime: 1000 * 60 * 60,
  });
  const movies = trendingMovies?.data?.results;
  const loading = trendingMovies?.isFetching;
  const error = trendingMovies?.error;
  const location = useLocation();

  return (
    <>
      {error && <p>{error.message}</p>}
      {loading && <ColorRing {...loaderOptions} />}
      {movies?.length && <MoviesList movies={movies} location={location} />}
    </>
  );
};

export default Trending;
