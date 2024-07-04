import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

// Fetch reports
export const fetchReports = createAsyncThunk(
  'reportProperties/fetchReports',
  async () => {
    const response = await axios.get('/report-properties');
    return response.data;
  }
);

// Fetch property reasons
export const fetchPropertyReasons = createAsyncThunk(
  'reportProperties/fetchPropertyReasons',
  async () => {
    const response = await axios.get('/reason-report/property');
    return response.data.data;
  }
);

// Delete report
export const deleteReport = createAsyncThunk(
  'reportProperties/deleteReport',
  async (id) => {
    await axios.delete(`/report-properties/deleteReport/${id}`);
    return id;
  }
);

// Delete property
export const deleteProperty = createAsyncThunk(
  'reportProperties/deleteProperty',
  async (id) => {
    await axios.delete(`/report-properties/deleteProperty/${id}`);
    return id;
  }
);

// Submit report
export const submitPropertyReport = createAsyncThunk(
  'reportProperties/submitPropertyReport',
  async (reportData) => {
    const response = await axios.post('/report-properties', reportData);
    return response.data;
  }
);

const reportPropertiesSlice = createSlice({
  name: 'reportProperties',
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
      .addCase(fetchPropertyReasons.fulfilled, (state, action) => {
        state.reasons = action.payload;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter(
          (report) => report.id !== action.payload
        );
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.reports = state.reports.filter(
          (report) => report.id !== action.payload
        );
      })
      .addCase(submitPropertyReport.fulfilled, (state, action) => {
        state.reports.push(action.payload);
      });
  },
});

export default reportPropertiesSlice.reducer;
