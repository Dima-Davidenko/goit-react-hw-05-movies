import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link, useLocation } from 'react-router-dom';
import { loaderOptions } from '../../constants';
import { fetchPopular } from '../../utils/fetchAPI';

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
      {movies?.length && (
        <ul className="movieList">
          {movies.map(movie => (
            <li className="movieListItem" key={movie.id}>
              <Link className="movieLink" to={`movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Trending;
