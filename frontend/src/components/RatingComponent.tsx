import React, { useState } from 'react';

const RatingComponent = () => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div>
      <p>Rating: {rating}</p>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleRatingChange(value)}
            style={{
              background: rating >= value ? 'gold' : 'lightgray',
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingComponent;
