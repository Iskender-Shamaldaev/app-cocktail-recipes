import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Cocktail } from '../../../type';
import { deleteCocktail, fetchCocktails, toggleCocktailPublished } from './cocktailsThunk';

interface CocktailsState {
  items: Cocktail[];
  fetchLoading: boolean;
  deleteLoading: boolean;
}

const initialState: CocktailsState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
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

    builder.addCase(deleteCocktail.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteCocktail.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCocktail.rejected, (state) => {
      state.deleteLoading = false;
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
