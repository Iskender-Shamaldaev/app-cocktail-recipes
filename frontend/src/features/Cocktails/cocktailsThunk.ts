import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Cocktail } from '../../../type';

export const fetchCocktails = createAsyncThunk<Cocktail[]>('cocktails/fetchAll', async () => {
  const cocktailsResponse = await axiosApi.get<Cocktail[]>('/cocktails');
  return cocktailsResponse.data;
});

export const deleteCocktail = createAsyncThunk<void, string>(
  'cocktails/delete',
  async (cocktailId) => {
    const response = await axiosApi.delete(`/cocktails/${cocktailId}`);
    return response.data;
  },
);

export const toggleCocktailPublished = createAsyncThunk<void, string>(
  'cocktail/togglePublished',
  async (cocktailId) => {
    await axiosApi.patch(`/cocktails/${cocktailId}/togglePublished`);
  },
);
