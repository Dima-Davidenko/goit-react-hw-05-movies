import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCastById } from '../../utils/fetchAPI';
import css from './CastInfo.module.css';

const CastInfo = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const movieId = location.pathname.split('/')[2];
  useEffect(() => {
    setLoading(true);
    fetchCastById(movieId)
      .then(({ data }) => setCast(data.cast))
      .catch(error => {
        setError(error.message);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [movieId]);
  return (
    <div>
      CastInfo
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {cast?.length === 0 && <p>We don't have any information about this movie</p>}
      {cast?.length > 0 && (
        <ul>
          {cast.map(({ name, profile_path, credit_id }) => (
            <li key={credit_id} className={css.actor}>
              {profile_path && (
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt=""
                />
              )}
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CastInfo;
