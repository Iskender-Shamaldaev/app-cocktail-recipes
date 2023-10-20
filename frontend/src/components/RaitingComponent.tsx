import React, { useEffect, useState } from 'react';
import { fetchCocktail } from '../features/Cocktails/cocktailsThunk';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCocktail } from '../features/Cocktails/cocktailsSlice';

const CocktailRating = () => {
  const dispatch = useAppDispatch();
  const [ratings, setRatings] = useState<number[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const { id: cocktailId } = useParams() as { id: string };
  const cocktails = useAppSelector(selectCocktail);

  useEffect(() => {
    dispatch(fetchCocktail(cocktailId));
  }, [cocktailId, dispatch]);

  const rateCocktail = (newRating: number) => {
    if (userRating === 0) {
      setUserRating(newRating);
      setRatings([...ratings, newRating]);
    } else {
      setUserRating(newRating);
      setRatings([...ratings.slice(0, ratings.length - 1), newRating]);
    }
  };

  const calculateAverageRating = () => {
    if (ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return sum / ratings.length;
  };

  return (
    <div>
      <p>Your mark: {cocktails && cocktails.ratings[0].rating}</p>
      <p>Average score: {calculateAverageRating().toFixed(2)}</p>
      <p>Number of ratings: {cocktails && cocktails.ratings.length}</p>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => rateCocktail(value)}
            style={{
              background: userRating >= value ? 'gold' : 'lightgray',
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CocktailRating;
