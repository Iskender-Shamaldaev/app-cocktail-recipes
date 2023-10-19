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

const CocktailsForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCocktailsLoading);
  const cocktailsLoading = useAppSelector(selectCocktailsLoading);

  const [state, setState] = useState<CocktailMutation>({
    name: '',
    image: null,
    recipe: '',
    ingredients: [{ name: '', quantity: '' }],
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createCocktail(state)).unwrap();
    navigate('/');
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

  const ingredientName = state.ingredients[0].name;
  const ingredientQuantity = state.ingredients[0].quantity;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'ingredientName') {
      setState((prevState) => ({
        ...prevState,
        ingredients: [
          {
            name: value,
            quantity: ingredientQuantity,
          },
        ],
      }));
    } else if (name === 'ingredientQuantity') {
      setState((prevState) => ({
        ...prevState,
        ingredients: [
          {
            name: ingredientName,
            quantity: value,
          },
        ],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addIngredientHandler = () => {
    setState((prevState) => ({
      ...prevState,
      ingredients: [...state.ingredients, { name: '', quantity: '' }],
    }));
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
        {state.ingredients.map((ingredient, index) => (
          <Grid item xs container key={index}>
            <Grid item xs>
              <TextField
                id={`ingredientName-${index}`}
                label="Ingredient Name"
                value={ingredient.name}
                onChange={inputChangeHandler}
                name="ingredientName"
                data-index={index}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id={`ingredientQuantity-${index}`}
                label="Amount"
                value={ingredient.quantity}
                onChange={inputChangeHandler}
                name="ingredientQuantity"
                data-index={index}
              />
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
