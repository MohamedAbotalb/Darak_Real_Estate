import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'services/axiosConfig';

const initialState = {
  notifications: [],
  status: 'idle',
  error: null,
};

export const fetchRenterNotifications = createAsyncThunk(
  'notifications/fetchRenterNotifications',
  async () => {
    const response = await axiosInstance.get('/notifications/renter');
    console.log( response.data.data)
    return response.data.data; // Accessing the 'data' array
  }
);

export const fetchLandlordNotifications = createAsyncThunk(
  'notifications/fetchLandlordNotifications',
  async () => {
    const response = await axiosInstance.get('/notifications/landlord');
        console.log( response.data.data)

    return response.data.data; // Accessing the 'data' array
  }
);

export const declineTour = createAsyncThunk(
  'notifications/declineTour',
  async (tourId) => {
    const response = await axiosInstance.post(`/tours/13/decline`);
    return response.data;
  }
);

export const approveDate = createAsyncThunk(
  'notifications/approveDate',
  async ({ tourId, selectedDate }) => {
    const response = await axiosInstance.post(`/tours/${tourId}/approve`, { selectedDate });
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRenterNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRenterNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = action.payload; // Assuming action.payload is an array of notification objects
      })
      .addCase(fetchRenterNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchLandlordNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLandlordNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = action.payload; // Assuming action.payload is an array of notification objects
      })
      .addCase(fetchLandlordNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(declineTour.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(declineTour.fulfilled, (state, action) => {
        state.status = 'declined';
        // Handle updating notifications state after declining tour if needed
      })
      .addCase(declineTour.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(approveDate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(approveDate.fulfilled, (state, action) => {
        state.status = 'approved';
        // Handle updating notifications state after approving date if needed
      })
      .addCase(approveDate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default notificationsSlice.reducer;
