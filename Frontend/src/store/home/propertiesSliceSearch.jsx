import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async ({ propertyType, locationId, listingType }) => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/properties/search/filter',
        {
          params: {
            property_type: propertyType,
            location_id: locationId,
            listing_type: listingType,
          },
        }
      );
      console.log('API Response for Properties:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw Error('Failed to fetch properties');
    }
  }
);

const propertiesSliceSearch = createSlice({
  name: 'propertiesSearch',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default propertiesSliceSearch.reducer;
