import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { CocktailMutation } from '../../../../type';
import { createCocktail } from '../cocktailsThunk';
import { selectCocktailsLoading } from '../cocktailsSlice';
import { selectUser } from '../../users/usersSlice';
import { userRoles } from '../../../constants';

const CocktailsForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCocktailsLoading);
  const cocktailsLoading = useAppSelector(selectCocktailsLoading);
  const users = useAppSelector(selectUser);

  const [state, setState] = useState<CocktailMutation>({
    name: '',
    image: null,
    recipe: '',
    ingredients: [{ name: '', quantity: '', id: '0' }],
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createCocktail(state)).unwrap();
    if (users && users.role !== userRoles.admin) {
      if (window.confirm('Your cocktail is being reviewed by a moderator!!!')) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const files = e.target.files;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const ingredientsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return {
        ...prevState,
        ingredients: prevState.ingredients.map((ing) => {
          if (ing.id === id) {
            return {
              ...ing,
              [name]: value,
            };
          }
          return ing;
        }),
      };
    });
  };

  const addIngredientHandler = () => {
    const id = state.ingredients.length.toString();
    setState((prevState) => ({
      ...prevState,
      ingredients: [...state.ingredients, { name: '', quantity: '', id }],
    }));
  };

  const deleteIngredientHandler = (idToDelete: string) => {
    if (state.ingredients.length > 1) {
      setState((prevState) => ({
        ...prevState,
        ingredients: prevState.ingredients.filter((ing) => ing.id !== idToDelete),
      }));
    }
  };

  return !cocktailsLoading ? (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid item sx={{ mb: 2 }}>
        <Typography variant="h5">Add a new cocktail</Typography>
      </Grid>

      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="name"
            label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>
        {state.ingredients.map((ing, index) => (
          <Grid item xs container key={ing.id}>
            <Grid item xs>
              <TextField
                required
                label="Ingredient Name"
                value={ing.name}
                onChange={(event) => ingredientsChangeHandler(event, ing.id)}
                name="name"
              />
            </Grid>
            <Grid item xs sx={{ marginLeft: 2 }}>
              <TextField
                required
                label="Amount"
                value={ing.quantity}
                onChange={(event) => ingredientsChangeHandler(event, ing.id)}
                name="quantity"
              />
            </Grid>
            <Grid item sx={{ marginLeft: 2, marginTop: 1 }}>
              {index !== 0 && (
                <Button onClick={() => deleteIngredientHandler(ing.id)} variant="contained">
                  Delete
                </Button>
              )}
            </Grid>
          </Grid>
        ))}

        <Grid item>
          <Button onClick={addIngredientHandler} variant="contained">
            Add ingredient
          </Button>
        </Grid>
        <Grid item xs>
          <TextField
            id="recipe"
            required
            label="Recipe"
            value={state.recipe}
            onChange={inputChangeHandler}
            name="recipe"
          />
        </Grid>
        <Grid item xs>
          <FileInput onChange={filesInputChangeHandler} name="image" label="Image" />
        </Grid>
        <Grid item xs>
          <LoadingButton
            type="submit"
            size="small"
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Create cocktail</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  ) : (
    <CircularProgress />
  );
};

export default CocktailsForm;
