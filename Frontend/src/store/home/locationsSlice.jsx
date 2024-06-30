import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    try {
      const response = await axios.get('/properties');
      return response.data.data.map((property) => ({
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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default locationsSlice.reducer;
