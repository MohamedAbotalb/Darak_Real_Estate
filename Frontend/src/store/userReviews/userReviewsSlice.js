import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchReviewsApi,
  addReviewApi,
  updateReviewApi,
  deleteReviewApi,
} from 'services/userReviewService';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (propertyId) => {
    return fetchReviewsApi(propertyId);
  }
);

export const addReviewAsync = createAsyncThunk(
  'reviews/addReview',
  async (reviewData) => {
    return addReviewApi(reviewData);
  }
);

export const updateReviewAsync = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, reviewData }) => {
    return updateReviewApi({ reviewId, reviewData });
  }
);

export const deleteReviewAsync = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    return deleteReviewApi(reviewId);
  }
);

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
        state.reviews = action.payload
          .slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      })
      .addCase(deleteReviewAsync.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      })
      .addCase(updateReviewAsync.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      });
  },
});

export default userReviewsSlice.reducer;
