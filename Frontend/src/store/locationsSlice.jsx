// src/slices/locationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/properties');
  return response.data.map((property) => ({
    id: property.location.id,
    city: property.location.city,
  }));
});

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    data: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLocations.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default locationsSlice.reducer;
