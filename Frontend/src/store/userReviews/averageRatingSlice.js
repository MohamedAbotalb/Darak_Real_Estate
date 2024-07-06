// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const fetchAverageRating = createAsyncThunk(
//   'averageRating/fetchAverageRating',
//   async (propertyId, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/reviews/Average/${propertyId}`
//       );
//       return parseFloat(response.data.average); // Convert average to float
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const averageRatingSlice = createSlice({
//   name: 'averageRating',
//   initialState: {
//     average: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAverageRating.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAverageRating.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.average = action.payload;
//       })
//       .addCase(fetchAverageRating.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export { fetchAverageRating };

// export default averageRatingSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAverageRating } from 'services/averageRatingService';

export const fetchAverageRatingAsync = createAsyncThunk(
  'averageRating/fetchAverageRating',
  async (propertyId, thunkAPI) => {
    try {
      return await fetchAverageRating(propertyId);
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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAverageRatingAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAverageRatingAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.average = action.payload;
      })
      .addCase(fetchAverageRatingAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default averageRatingSlice.reducer;
