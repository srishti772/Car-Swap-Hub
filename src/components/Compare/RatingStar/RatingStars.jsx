import React from 'react';
import { StarFill, StarHalf, Star } from 'react-bootstrap-icons';

const RatingStars = ({ rating }) => {
  const filledStars = Math.floor(rating); // Number of full stars
  const remainder = rating - filledStars; // Remainder after getting full stars

  return (
    <>
      <div className="d-flex">
        {/* Render full stars */}
        {[...Array(filledStars)].map((_, i) => (
          <StarFill key={i} />
        ))}

        {/* Render half star if needed */}
        {remainder > 0 && remainder < 0.5 && <StarHalf key="half" />}

        {/* Render partially filled star with clip path */}
        {remainder >= 0.5 && (
          <StarFill
            key="partial"
            style={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}
          />
        )}

        {/* Render empty stars */}
        {[...Array(5 - filledStars - (remainder ? 1 : 0))].map((_, i) => (
          <Star key={i} />
        ))}
        {rating}
      </div>
    </>
  );
};

export default RatingStars;
