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
import { motion } from 'framer-motion';

const Link = styled(Navlink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const fadeInVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

interface Props {
  id: string;
  name: string;
  image: string | null;
  isPublished: boolean;
}

const CocktailItem: React.FC<Props> = ({ id, name, image, isPublished }) => {
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
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to={'/cocktails/' + id}>
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
      </motion.div>
      <div style={{ display: 'flex' }}>
        {users && users.role === userRoles.admin && (
          <Button color="primary" onClick={handleDeleteClick}>
            Delete
          </Button>
        )}
        {users && users.role === userRoles.admin && (
          <Button color="primary" onClick={handleTogglePublishedClick}>
            {isPublished ? 'Publish' : 'Unpublish'}
          </Button>
        )}
      </div>
    </Grid>
  );
};

export default CocktailItem;
