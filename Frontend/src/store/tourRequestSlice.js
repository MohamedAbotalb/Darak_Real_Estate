import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

// const token = localStorage.getItem('authToken');

export const submitTourRequest = createAsyncThunk(
  'tourRequest/submitTourRequest',
  async ({ propertyId, dates }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/tour', {
        property_id: propertyId,
        status: 'pending',
        dates,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        'Error submitting tour request. Please try again later.'
      );
    }
  }
);

const tourRequestSlice = createSlice({
  name: 'tourRequest',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTourRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTourRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitTourRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tourRequestSlice.reducer;
