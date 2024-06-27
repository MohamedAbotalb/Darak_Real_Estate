import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPropertyTypes = createAsyncThunk(
  'propertyTypes/fetchPropertyTypes',
  async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/property-types'
      );
      console.log('API Response for Property Types:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching property types:', error);
      throw new Error('Failed to fetch property types');
    }
  }
);
console.log('ranaf', fetchPropertyTypes);

const propertyTypeSlice = createSlice({
  name: 'propertyTypes',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyTypes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchPropertyTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default propertyTypeSlice.reducer;
