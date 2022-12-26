import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { loaderOptions } from '../../constants';
import { fetchCastById } from '../../utils/fetchAPI';
import css from './CastInfo.module.css';

const CastInfo = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
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
    <div className="castInfo">
      Cast
      {loading && <ColorRing {...loaderOptions} />}
      {error && <p>{error}</p>}
      {cast?.length === 0 && <p>We don't have any information about this movie</p>}
      {cast?.length > 0 && (
        <ul className="castList">
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
