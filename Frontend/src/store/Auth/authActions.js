import secureLocalStorage from 'react-secure-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerApi,
  loginApi,
  forgetPasswordApi,
  resetPasswordApi,
} from 'services/authService';
import axios from 'axiosConfig';

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const response = await registerApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await loginApi(data);

    // store user's token and data in local storage
    secureLocalStorage.setItem('token', response.data.access_token);
    secureLocalStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const forgetPassword = createAsyncThunk(
  'auth/forget-password',
  async (data, thunkAPI) => {
    try {
      const response = await forgetPasswordApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (data, thunkAPI) => {
    try {
      const response = await resetPasswordApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${secureLocalStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.put('/api/users/update', data, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (data, thunkAPI) => {
    try {
      const response = await axios.put('/api/users/updatePassword', data, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete('/api/users/', {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
