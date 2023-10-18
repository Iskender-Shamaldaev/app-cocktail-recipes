import React, { useEffect } from 'react';
import { fetchCocktail } from '../Cocktails/cocktailsThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails } from '../Cocktails/cocktailsSlice';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import { apiUrl } from '../../constants';

const Ingredients = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const { id: cocktailId } = useParams() as { id: string };
  let cocktailImage = imageNotAvailable;

  if (cocktails.length > 0) {
    cocktailImage = apiUrl + '/' + cocktails[0].image;
  }

  useEffect(() => {
    dispatch(fetchCocktail(cocktailId));
  }, [cocktailId, dispatch]);

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">List of ingredients</Typography>
          </Grid>
        </Grid>
        <CardMedia sx={{ height: '400px', borderRadius: '10px' }} image={cocktailImage} />
        {cocktails.map((cocktail) => (
          <Card key={cocktail._id} sx={{ mb: 2, mt: 2, p: 2, boxShadow: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2>{cocktail.name}</h2>
                <p>
                  <strong>Ingredients:</strong>
                  {cocktail.ingredients.map((ingredient, index) => (
                    <React.Fragment key={index}>
                      <span>
                        {ingredient.quantity}: {ingredient.name}
                      </span>
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <p>
                  <strong>Recipe: </strong> {cocktail.recipe}
                </p>
              </div>
              <div></div>
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default Ingredients;
