// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from 'services/axiosConfig';

// export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (propertyId) => {
//   const response = await axiosInstance.get(`/reviews?property_id=${propertyId}`);
//   return response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by creation date descending
// });

// export const addReviewAsync = createAsyncThunk('reviews/addReview', async (reviewData) => {
//   const response = await axiosInstance.post('/reviews', reviewData);
//   return response.data;
// });

// const userReviewsSlice = createSlice({
//   name: 'reviews',
//   initialState: {
//     reviews: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     addReview: (state, action) => {
//       state.reviews.unshift(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchReviews.pending, (state) => {
//         state.status = 'loading';
//       })
//      .addCase(addReviewAsync.fulfilled, (state, action) => {
//         state.reviews.unshift(action.payload); // Update state with new review
//       })
//       .addCase(fetchReviews.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
      
//   },
// });

// export const { addReview } = userReviewsSlice.actions;
// export default userReviewsSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'services/axiosConfig'; // Assuming you have axiosInstance configured

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (propertyId) => {
  const response = await axiosInstance.get(`/reviews?property_id=${propertyId}`);
  return response.data.data;
});

export const addReviewAsync = createAsyncThunk('reviews/addReview', async (reviewData) => {
  const response = await axiosInstance.post('/reviews', reviewData);
  return response.data;
});

export const deleteReviewAsync = createAsyncThunk('reviews/deleteReview', async (reviewId) => {
  await axiosInstance.delete(`/reviews/${reviewId}`);
  return reviewId;
});

export const updateReviewAsync = createAsyncThunk('reviews/updateReview', async ({ reviewId, reviewData }) => {
  const response = await axiosInstance.put(`/reviews/${reviewId}`, reviewData);
  return response.data;
});

const userReviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Sort reviews in descending order based on the creation date
        state.reviews = action.payload.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(review => review.id !== action.payload);
      })
      .addCase(updateReviewAsync.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(review => review.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      });
  },
});

export default userReviewsSlice.reducer;
