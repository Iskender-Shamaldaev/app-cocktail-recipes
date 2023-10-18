import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { selectCocktails } from './cocktailsSlice';
import { fetchCocktails } from './cocktailsThunk';
import CocktailItem from './components/CocktailItem';
import { selectUser } from '../users/usersSlice';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

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
            <Button color="primary" component={Link} to="/cocktails/new">
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
