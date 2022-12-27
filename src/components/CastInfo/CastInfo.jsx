import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { loaderOptions } from '../../constants';
import { fetchCastById } from '../../utils/fetchAPI';
import css from './CastInfo.module.css';

const CastInfo = () => {
  const { movieId } = useParams();
  const castInfo = useQuery({
    queryKey: ['castInfo', movieId],
    queryFn: fetchCastById,
    staleTime: 1000 * 60 * 60,
  });
  const cast = castInfo?.data?.cast;
  const loading = castInfo?.isFetching;
  const error = castInfo?.error;
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
