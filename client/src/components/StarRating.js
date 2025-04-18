import React from 'react';
import './StarRating.css';

const StarRating = ({ rating = 0, onRate, eventId }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map(starValue => (
        <span
          key={starValue}
          className={`star ${starValue <= rating ? 'filled' : ''}`}
          onClick={() => onRate(eventId, starValue)} // Call handler with eventId and rating
          role="button"
          aria-label={`Rate ${starValue} stars`}
        >
          ★ 
        </span>
      ))}
      {/* Optionally display numerical rating */} 
      {/* {rating > 0 && <span className="rating-number">({rating})</span>} */} 
    </div>
  );
};

export default StarRating; 