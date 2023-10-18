import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchCocktail } from '../Cocktails/cocktailsThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails } from '../Cocktails/cocktailsSlice';
import { useParams } from 'react-router-dom';
import { CardMedia, Grid, Paper, Typography } from '@mui/material';
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import { apiUrl } from '../../constants';

const scaleAnimation = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

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
    <motion.div variants={scaleAnimation} initial="hidden" animate="visible">
      <Paper sx={{ p: 2, boxShadow: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              sx={{ height: '100%', maxWidth: '100%', borderRadius: '10px' }}
              image={cocktailImage}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {cocktails.map((cocktail) => (
              <div key={cocktail._id}>
                <Typography variant="h5" color="primary">
                  {cocktail.name}
                </Typography>
                <Typography>
                  <strong>Ingredients:</strong>
                </Typography>
                <ul>
                  {cocktail.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.quantity}: {ingredient.name}
                    </li>
                  ))}
                </ul>
                <Typography>
                  <strong>Recipe:</strong> {cocktail.recipe}
                </Typography>
              </div>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default Ingredients;
