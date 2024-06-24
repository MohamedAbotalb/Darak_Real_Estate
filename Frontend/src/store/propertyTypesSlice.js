/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

export const fetchPropertyTypes = createAsyncThunk(
  'propertyTypes/fetchPropertyTypes',
  async () => {
    const response = await axios.get(
      '/property-types'
    );
    return response.data;
  }
);

export const propertyTypesSlice = createSlice({
  name: 'propertyTypes',
  initialState: {
    propertyTypes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.propertyTypes = action.payload;
      })
      .addCase(fetchPropertyTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default propertyTypesSlice.reducer;
