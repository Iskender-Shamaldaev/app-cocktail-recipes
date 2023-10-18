import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link as Navlink } from 'react-router-dom';
import imageNotAvailable from '../../../assets/images/imageNotAvailable.png';
import { apiUrl, userRoles } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { deleteCocktail, fetchCocktails, toggleCocktailPublished } from '../cocktailsThunk';

const Link = styled(Navlink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

interface Props {
  id: string;
  name: string;
  image: string | null;
  recipe: string;
  isPublished: boolean;
  user: {
    name: string;
  };
  ingredients: [
    {
      name: string;
      quantity: string;
    },
  ];
}

const ArtistItem: React.FC<Props> = ({
  id,
  name,
  image,
  isPublished,
  recipe,
  user,
  ingredients,
}) => {
  let cocktailImage = imageNotAvailable;
  const users = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  if (image) {
    cocktailImage = apiUrl + '/' + image;
  }

  if (users && users.role === userRoles.user && !isPublished) {
    return null;
  }

  const handleDeleteClick = async () => {
    await dispatch(deleteCocktail(id));
    await dispatch(fetchCocktails());
  };

  const handleTogglePublishedClick = async () => {
    await dispatch(toggleCocktailPublished(id));
    await dispatch(fetchCocktails());
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to={'/ingredients/' + id}>
        <Card>
          <CardActionArea>
            <CardMedia sx={{ height: '400px' }} image={cocktailImage} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {isPublished ? 'Published' : 'Not published'}
              </Typography>
              <Grid container justifyContent="space-between" alignItems="center">
                <ArrowForwardIosIcon />
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <div style={{ display: 'flex' }}>
        <Grid item>
          {users && users.role === userRoles.admin && (
            <Button color="primary" onClick={handleDeleteClick}>
              Delete
            </Button>
          )}
        </Grid>
        <Grid item>
          {users && users.role === userRoles.admin && (
            <Button color="primary" onClick={handleTogglePublishedClick}>
              {isPublished ? 'Publish' : 'Unpublish'}
            </Button>
          )}
        </Grid>
      </div>
    </Grid>
  );
};

export default ArtistItem;
