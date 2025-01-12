import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

export const fetchProperties = createAsyncThunk(
  'propertiesSearch/fetchProperties',
  async ({ propertyType, locationId, listingType, beds, baths, price }) => {
    try {
      console.log({
        propertyType,
        locationId,
        listingType,
        beds,
        baths,
        price,
      });
      const response = await axios.get('/properties/search/filter/Advanced', {
        params: {
          property_type: propertyType || null,
          location_id: locationId || null,
          listing_type: listingType || null,
          num_of_bedrooms: beds || null,
          num_of_bathrooms: baths || null,
          price: price || null,
        },
      });
      return response.data;
    } catch (error) {
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
        console.log(state.data);
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default propertiesSliceSearch.reducer;
