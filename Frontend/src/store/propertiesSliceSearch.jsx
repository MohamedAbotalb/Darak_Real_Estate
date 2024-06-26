// src/slices/propertiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async ({ propertyType, locationId }) => {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/properties/search/filter',
      {
        params: {
          property_type: propertyType,
          location_id: locationId,
        },
      }
    );
    return response.data;
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    data: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProperties.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default propertiesSlice.reducer;
