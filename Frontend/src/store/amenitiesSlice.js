import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAmenities as fetchAmenitiesService,
  addAmenity as addAmenityService,
  deleteAmenity as deleteAmenityService,
} from '../services/amenity';

export const fetchAmenities = createAsyncThunk(
  'amenities/fetchAmenities',
  async () => {
    const response = await fetchAmenitiesService();
    return response.data;
  }
);

export const addAmenity = createAsyncThunk(
  'amenities/addAmenity',
  async (newAmenity) => {
    const response = await addAmenityService(newAmenity);
    return response;
  }
);

export const deleteAmenity = createAsyncThunk(
  'amenities/deleteAmenity',
  async (amenityId) => {
    const response = await deleteAmenityService(amenityId);
    return response;
  }
);

const amenitiesSlice = createSlice({
  name: 'amenities',
  initialState: {
    amenities: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmenities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAmenities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.amenities = action.payload;
      })
      .addCase(fetchAmenities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addAmenity.fulfilled, (state, action) => {
        state.amenities.push(action.payload);
      })
      .addCase(deleteAmenity.fulfilled, (state, action) => {
        state.amenities = state.amenities.filter(
          (amenity) => amenity.id !== action.payload
        );
      });
  },
});

export default amenitiesSlice.reducer;
