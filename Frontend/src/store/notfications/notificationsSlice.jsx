import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    message: 'Notification 1: Lorem ipsum dolor sit amet.',
    dates: ['2024-07-01', '2024-07-05', '2024-07-10'],
  },
  {
    id: 2,
    message: 'Notification 2: Consectetur adipiscing elit.',
    dates: ['2024-07-02', '2024-07-06', '2024-07-11'],
  },
];

// Thunk to fetch notifications for the landlord (mocked)
export const fetchLandlordNotifications = createAsyncThunk(
  'notifications/fetchLandlord',
  async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockNotifications; // Replace with actual API call
  }
);

// Thunk to approve a date (mocked)
export const approveDate = createAsyncThunk(
  'notifications/approveDate',
  async ({ tourId, selectedDate }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { tourId, selectedDate }; // Replace with actual API call
  }
);

// Thunk to decline a tour (mocked)
export const declineTour = createAsyncThunk(
  'notifications/declineTour',
  async (tourId) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { tourId }; // Replace with actual API call
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    landlordNotifications: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandlordNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLandlordNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.landlordNotifications = action.payload;
      })
      .addCase(fetchLandlordNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(approveDate.fulfilled, (state, action) => {
        // Update notification status on approval (mocked)
        state.landlordNotifications = state.landlordNotifications.map((notification) =>
          notification.id === action.payload.tourId
            ? { ...notification, status: 'approved', approvedDate: action.payload.selectedDate }
            : notification
        );
      })
      .addCase(declineTour.fulfilled, (state, action) => {
        // Update notification status on decline (mocked)
        state.landlordNotifications = state.landlordNotifications.map((notification) =>
          notification.id === action.payload.tourId
            ? { ...notification, status: 'declined' }
            : notification
        );
      });
  },
});

export default notificationsSlice.reducer;
