import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Cocktail } from '../../../type';
import {
  createCocktail,
  deleteCocktail,
  fetchCocktail,
  fetchCocktails,
  toggleCocktailPublished,
} from './cocktailsThunk';

interface CocktailsState {
  items: Cocktail[];
  fetchLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
}

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCocktails.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
      state.fetchLoading = false;
      state.items = cocktails;
    });
    builder.addCase(fetchCocktails.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchCocktail.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCocktail.fulfilled, (state, { payload: cocktail }) => {
      state.fetchLoading = false;
      state.items = [cocktail];
    });
    builder.addCase(fetchCocktail.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteCocktail.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteCocktail.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCocktail.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(createCocktail.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createCocktail.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCocktail.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(toggleCocktailPublished.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(toggleCocktailPublished.fulfilled, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(toggleCocktailPublished.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.fetchLoading;
export const selectCocktailCreating = (state: RootState) => state.cocktails.createLoading;
