import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectCocktails } from './cocktailsSlice';
import { fetchCocktails } from './cocktailsThunk';
import CocktailItem from './components/CocktailItem';
import AddIcon from '@mui/icons-material/Add';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography color={'greenyellow'} variant="h5">
              List of cocktails
            </Typography>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/cocktails/new"
              startIcon={<AddIcon />}
            >
              <strong> Add cocktail</strong>
            </Button>
          </Grid>
        </Grid>

        <Grid container item spacing={2}>
          {cocktails.map((cocktail) => (
            <CocktailItem
              key={cocktail._id}
              id={cocktail._id}
              name={cocktail.name}
              image={cocktail.image}
              isPublished={cocktail.isPublished}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Cocktails;
