import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPopular } from '../../utils/fetchAPI';

const Trending = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();

  useEffect(() => {
    fetchPopular().then(({ results }) => {
      setMovies(results);
    });
  }, []);

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`movies/${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Trending;
