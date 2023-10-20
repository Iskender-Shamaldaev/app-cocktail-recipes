import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchCocktail } from '../cocktailsThunk';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCocktail } from '../cocktailsSlice';
import { useParams } from 'react-router-dom';
import { CardMedia, Grid, Paper, Typography } from '@mui/material';
import imageNotAvailable from '../../../assets/images/imageNotAvailable.png';
import { apiUrl } from '../../../constants';

const scaleAnimation = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

const OneCocktail = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktail);
  const { id: cocktailId } = useParams() as { id: string };
  let cocktailImage = imageNotAvailable;

  if (cocktails?.image) {
    cocktailImage = apiUrl + '/' + cocktails?.image;
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
              sx={{ height: '500px', maxWidth: '100%', borderRadius: '10px' }}
              image={cocktailImage}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div key={cocktails?._id}>
              <Typography variant="h5" color="primary">
                {cocktails?.name}
              </Typography>
              <Typography>
                <strong>Ingredients:</strong>
              </Typography>
              <ul>
                {cocktails?.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.quantity}: {ingredient.name}
                  </li>
                ))}
              </ul>
              <Typography>
                <strong>Recipe:</strong> {cocktails?.recipe}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default OneCocktail;
