import React, { Suspense, useState } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { fetchDetailsById } from '../../utils/fetchAPI';
import css from './MovieDetails.module.css';

const addInfoOptions = [
  { linkName: 'Cast', linkTo: 'cast' },
  { linkName: 'Reviews', linkTo: 'reviews' },
];

const MovieDetails = () => {
  const location = useLocation();
  const movieId = location.pathname.split('/')[2];
  const [movieInfo, setMovieInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchDetailsById(movieId)
      .then(res => setMovieInfo(res))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (!movieInfo)
    return (
      <div>
        <Link to={location?.state?.from ?? '/'}>Go back</Link>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    );
  const { title, poster_path, vote_average, overview, genres = [] } = movieInfo;
  return (
    <div>
      <Link to={location?.state?.from ?? '/'}>Go back</Link>
      {movieInfo && (
        <>
          <div className={css.container}>
            <img
              className={css.poster}
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
            <div className={css.description}>
              <h2>{title}</h2>
              <p>User score: {Math.round(vote_average * 10)}%</p>
              <h3>Overview:</h3>
              <p>{overview}</p>
              <h4>Genres:</h4>
              <p>{genres.map(({ name }) => name).join(', ')}</p>
            </div>
          </div>
          <div className={css.addInfoNav}>
            <p>Additional information:</p>
            <ul>
              {addInfoOptions.map(({ linkName, linkTo }) => (
                <li key={linkTo}>
                  <Link to={linkTo} state={{ from: location.state.from }}>
                    {linkName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
