import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Cocktail, CocktailMutation } from '../../../type';

export const fetchCocktails = createAsyncThunk<Cocktail[]>('cocktails/fetchAll', async () => {
  const cocktailsResponse = await axiosApi.get<Cocktail[]>('/cocktails');
  return cocktailsResponse.data;
});

export const fetchCocktail = createAsyncThunk<Cocktail, string>(
  'cocktails/fetchOne',
  async (cocktailId) => {
    const cocktailsResponse = await axiosApi.get<Cocktail>(`/cocktails/${cocktailId}`);
    return cocktailsResponse.data;
  },
);

export const createCocktail = createAsyncThunk<void, CocktailMutation>(
  'cocktails/create',
  async (productMutation) => {
    const formData = new FormData();
    const keys = Object.keys(productMutation) as (keyof CocktailMutation)[];

    keys.forEach((key) => {
      const value = productMutation[key];

      if (value !== null) {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}][name]`, item.name);
            formData.append(`${key}[${index}][quantity]`, item.quantity);
          });
        } else {
          formData.append(key, value as string);
        }
      }
    });

    await axiosApi.post('/cocktails', formData);
  },
);

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
