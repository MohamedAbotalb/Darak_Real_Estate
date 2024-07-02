import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

export const fetchToursByStatus = createAsyncThunk(
  'tours/fetchToursByStatus',
  async (status) => {
    const response = await axios.get(`/tour/${status}`);
    return response.data.tours;
  }
);

export const cancelTour = createAsyncThunk(
  'tours/cancelTour',
  async (tourId) => {
    const response = await axios.delete(`/tour/${tourId}`);
    return { tourId, message: response.data.message };
  }
);

const tourSlice = createSlice({
  name: 'tours',
  initialState: {
    tours: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToursByStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchToursByStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tours = action.payload;
      })
      .addCase(fetchToursByStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(cancelTour.fulfilled, (state, action) => {
        state.tours = state.tours.filter(
          (tour) => tour.id !== action.payload.tourId
        );
      });
  },
});

export default tourSlice.reducer;
