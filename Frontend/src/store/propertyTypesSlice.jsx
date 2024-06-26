// src/slices/propertyTypesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPropertyTypes = createAsyncThunk(
  'propertyTypes/fetchPropertyTypes',
  async () => {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/property-types'
    );
    return response.data;
  }
);

const propertyTypesSlice = createSlice({
  name: 'propertyTypes',
  initialState: {
    data: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPropertyTypes.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default propertyTypesSlice.reducer;
