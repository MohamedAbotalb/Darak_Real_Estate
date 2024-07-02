import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

// Fetch reports
export const fetchReports = createAsyncThunk(
  'reportUsers/fetchReports',
  async () => {
    const response = await axios.get('/report-users');
    return response.data.data;
  }
);

// Fetch landlord reasons
export const fetchLandlordReasons = createAsyncThunk(
  'reportUsers/fetchLandlordReasons',
  async () => {
    const response = await axios.get('/reason-report/landlord');
    return response.data.data;
  }
);

// Delete report
export const deleteReport = createAsyncThunk(
  'reportUsers/deleteReport',
  async (id) => {
    await axios.delete(`/report-users/deleteReport/${id}`);
    return id;
  }
);

// Delete landlord
export const deleteLandlord = createAsyncThunk(
  'reportUsers/deleteLandlord',
  async (id) => {
    await axios.delete(`/report-users/deleteLandlord/${id}`);
    return id;
  }
);

// Submit report
export const submitLandlordReport = createAsyncThunk(
  'reportUsers/submitLandlordReport',
  async (reportData) => {
    const response = await axios.post('/report-users', reportData);
    return response.data;
  }
);

const reportUsersSlice = createSlice({
  name: 'reportUsers',
  initialState: {
    reports: [],
    reasons: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchLandlordReasons.fulfilled, (state, action) => {
        state.reasons = action.payload;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter(
          (report) => report.id !== action.payload
        );
      })
      .addCase(deleteLandlord.fulfilled, (state, action) => {
        state.reports = state.reports.filter(
          (report) => report.landlord.id !== action.payload
        );
      })
      .addCase(submitLandlordReport.fulfilled, (state, action) => {
        state.reports.push(action.payload);
      });
  },
});

export default reportUsersSlice.reducer;
