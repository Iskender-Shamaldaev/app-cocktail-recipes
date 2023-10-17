import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  User,
  ValidationError,
} from '../../../type';
import { unsetUser } from './usersSlice';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

    keys.forEach((key) => {
      const value = registerMutation[key];

      if (value !== null) {
        if (key === 'avatar' && value instanceof File) {
          formData.append('avatar', value);
        } else {
          formData.append(key, value);
        }
      }
    });

    const response = await axiosApi.post<RegisterResponse>('/users', formData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const googleLogin = createAsyncThunk<User, string, { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/google', { credential });
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk('users/logout', async (_, { dispatch }) => {
  await axiosApi.delete('users/sessions');
  dispatch(unsetUser());
});
