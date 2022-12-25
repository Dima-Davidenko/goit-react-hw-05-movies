import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import { loaderOptions } from '../../constants';
import { fetchReviewById } from '../../utils/fetchAPI';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const movieId = location.pathname.split('/')[2];
  useEffect(() => {
    setLoading(true);
    fetchReviewById(movieId)
      .then(res => {
        setReviews(res.results);
      })
      .catch(error => {
        setError(error.message);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [movieId]);
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
