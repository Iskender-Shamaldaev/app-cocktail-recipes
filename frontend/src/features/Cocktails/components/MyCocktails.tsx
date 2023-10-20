import React, { useEffect } from 'react';
import { fetchUsersCocktails } from '../cocktailsThunk';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCocktails } from '../cocktailsSlice';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { apiUrl } from '../../../constants';

const MyCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);

  useEffect(() => {
    dispatch(fetchUsersCocktails());
  }, [dispatch]);

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography sx={{ marginBottom: 5 }} color={'greenyellow'} variant="h5">
              My cocktails...
            </Typography>
          </Grid>

          <Grid container item spacing={2}>
            {cocktails.map((cocktail) => (
              <Card key={cocktail._id} sx={{ width: 345, margin: 8 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={apiUrl + '/' + cocktail.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {cocktail.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {cocktail.isPublished ? 'Published' : 'Not published'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyCocktails;
