import secureLocalStorage from 'react-secure-storage';
import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  register,
  forgetPassword,
  resetPassword,
} from 'store/Auth/authActions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(secureLocalStorage.getItem('user')) || null,
    token: secureLocalStorage.getItem('token') || null,
    isAdmin: false,
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout: (state) => {
      secureLocalStorage.removeItem('token');
      secureLocalStorage.removeItem('user');
      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.successMessage = null;
    },
    clearState: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.successMessage = null;
    },
    setCredentials: (state, { payload }) => {
      state.user = payload;
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
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, clearState, setCredentials } = authSlice.actions;

export default authSlice.reducer;
