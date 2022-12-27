import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { loaderOptions } from '../../constants';
import { fetchReviewById } from '../../utils/fetchAPI';

const Reviews = () => {
  const { movieId } = useParams();
  const reviewsInfo = useQuery({
    queryKey: ['reviewsInfo', movieId],
    queryFn: fetchReviewById,
    staleTime: 1000 * 60 * 60,
  });
  const reviews = reviewsInfo?.data?.results;
  const loading = reviewsInfo?.isFetching;
  const error = reviewsInfo?.error;
  return (
    <div className="reviewInfo">
      Reviews
      {loading && <ColorRing {...loaderOptions} />}
      {error && <p>{error}</p>}
      {reviews?.length === 0 && <p>We don't have any reviews on this movie</p>}
      {reviews?.length > 0 && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
