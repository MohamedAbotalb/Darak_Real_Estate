
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
    return response.data.data; // Accessing the 'data' array
  }
);

export const fetchLandlordNotifications = createAsyncThunk(
  'notifications/fetchLandlordNotifications',
  async () => {
    const response = await axiosInstance.get('/notifications/landlord');
    return response.data.data; // Accessing the 'data' array
  }
);

export const declineTour = createAsyncThunk(
  'notifications/declineTour',
  async (tourId) => {
    const response = await axiosInstance.post(`/tours/${tourId}/decline`);
    return response.data;
  }
);

export const approveDate = createAsyncThunk(
  'notifications/approveDate',
  async ({ tourId, selectedDate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/tours/${tourId}/approve`, {
        tour_date: selectedDate.id,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue(error.request);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/notifications/${id}`);
      return { id };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue(error.request);
      } else {
        return rejectWithValue(error.message);
      }
    }
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
        state.notifications = action.payload;
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
        state.notifications = action.payload;
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
      })
      .addCase(approveDate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.payload.id
        );
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default notificationsSlice.reducer;
