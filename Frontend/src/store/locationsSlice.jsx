import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/properties');
      return response.data.map((property) => ({
        id: property.location.id,
        city: property.location.city,
      }));
    } catch (error) {
      throw Error('Failed to fetch locations');
    }
  }
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    data: [],
    status: 'idle',
    error: null, // Add an error field to store fetch errors
  },
  reducers: {}, // Add reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Reset error state on pending
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null; // Reset error state on success
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store the error message
      });
  },
});

export default locationsSlice.reducer;
