import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchAverageRating = createAsyncThunk(
  'averageRating/fetchAverageRating',
  async (propertyId, thunkAPI) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reviews/Average/${propertyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch average rating');
      }
      return parseFloat(response.average); // Ensure to parse average as needed
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const averageRatingSlice = createSlice({
  name: 'averageRating',
  initialState: {
    average: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAverageRating.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAverageRating.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.average = action.payload;
      })
      .addCase(fetchAverageRating.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export { fetchAverageRating };

export default averageRatingSlice.reducer;
