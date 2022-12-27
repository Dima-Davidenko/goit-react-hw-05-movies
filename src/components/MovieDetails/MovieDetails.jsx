import { useQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { loaderOptions } from '../../constants';
import { fetchDetailsById } from '../../utils/fetchAPI';

const addInfoOptions = [
  { linkName: 'Cast', linkTo: 'cast' },
  { linkName: 'Reviews', linkTo: 'reviews' },
];

const MovieDetails = () => {
  const location = useLocation();
  const { movieId } = useParams();

  const movieDetails = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: fetchDetailsById,
    staleTime: 1000 * 60 * 60,
  });
  const movieInfo = movieDetails?.data;
  const loading = movieDetails?.isFetching;
  const error = movieDetails?.error;

  if (!movieInfo)
    return (
      <div>
        <Link className="goBackLink" to={location?.state?.from ?? '/'}>
          ← Go back
        </Link>
        {loading && <ColorRing {...loaderOptions} />}
        {error && <p>{error}</p>}
      </div>
    );
  const { title, poster_path, vote_average, overview, genres = [] } = movieInfo;
  return (
    <div>
      <Link className="goBackLink" to={location?.state?.from ?? '/'}>
        ← Go back
      </Link>
      {movieInfo && (
        <>
          <div className="movieInfoContainer">
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
            <div>
              <h2>{title}</h2>
              <p>User score: {Math.round(vote_average * 10)}%</p>
              <h3>Overview:</h3>
              <p>{overview}</p>
              <h4>Genres:</h4>
              <p>{genres.map(({ name }) => name).join(', ')}</p>
            </div>
          </div>
          <div className="addInfoNav">
            <p>Additional information:</p>
            <ul className="optionsList">
              {addInfoOptions.map(({ linkName, linkTo }) => (
                <li className="optionsListItem" key={linkTo}>
                  <Link className="optionsLink" to={linkTo} state={{ from: location?.state?.from }}>
                    {linkName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <Suspense fallback={<ColorRing {...loaderOptions} />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
