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
    const response = await fetchReviewsApi(propertyId);
    return response.data; 
  }
);

export const addReviewAsync = createAsyncThunk(
  'reviews/addReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await addReviewApi(reviewData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReviewAsync = createAsyncThunk(
  'reviews/updateReview',
  async ({ reviewId, reviewData }) => {
    const response = await updateReviewApi({ reviewId, reviewData });
    return response;
  }
);

export const deleteReviewAsync = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    const response = await deleteReviewApi(reviewId);
    return reviewId;
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
        console.log(action.payload); // Log the payload to check the structure
        state.status = 'succeeded';
        if (Array.isArray(action.payload)) {
          state.reviews = action.payload
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else {
          state.error = 'Invalid response structure';
        }
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      })
      .addCase(addReviewAsync.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
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
