import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

export const fetchProperty = createAsyncThunk(
  'property/fetchProperty',
  async (slug) => {
    const response = await axios.get(`/properties/${slug}`);
    return response.data.data;
  }
);

const propertyDetailsSlice = createSlice({
  name: 'property',
  initialState: {
    property: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperty.pending, (state) => {
        return { ...state, status: 'loading' };
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        return { ...state, status: 'succeeded', property: action.payload };
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        return { ...state, status: 'failed', error: action.error.message };
      });
  },
});

export default propertyDetailsSlice.reducer;
