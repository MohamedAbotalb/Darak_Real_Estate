// propertiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async ({ type, category }, { rejectWithValue }) => {
    try {
      const endpoint = type === 'rent' ? 'latest-rent' : 'latest-sell';
      const url = category && category !== 'all'
        ? `http://localhost:8000/api/properties/${endpoint}/${category}`
        : `http://localhost:8000/api/properties/${endpoint}/1`; // Assuming '1' is a valid category id for fetching all categories
      const response = await axios.get(url);
            console.log(response.data)

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// propertiesSlice.js

const initialState = {
  rent: [], // Initialize as empty array
  sell: [], // Initialize as empty array
  status: 'idle',
  error: null,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { type } = action.meta.arg;
        state[type] = action.payload.properties; // Update state[type] with action.payload.properties
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
          ? action.payload
          : 'Failed to fetch properties';
      });
  },
});

export default propertiesSlice.reducer;

