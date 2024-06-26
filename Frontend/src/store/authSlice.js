import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerApi, loginApi, logoutApi } from 'services/authService';

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

    // store user's token in local storage
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await logoutApi();
    return {};
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// initialize userToken from local storage
const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token,
    isAdmin: false,
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAdmin = action.payload.is_admin;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAdmin = false;
      });
  },
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
