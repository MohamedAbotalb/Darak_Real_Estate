import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCounts as fetchCountsService } from '../services/overview';

export const fetchCounts = createAsyncThunk(
  'overview/fetchCounts',
  async () => {
    const response = await fetchCountsService();
    return response;
  }
);

const overviewSlice = createSlice({
  name: 'overview',
  initialState: {
    counts: {
      users: 0,
      properties: 0,
      property_types: 0,
      user_reports: 0,
      property_reports: 0,
      amenities: 0,
    },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.counts = action.payload;
      })
      .addCase(fetchCounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default overviewSlice.reducer;
