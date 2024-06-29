import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReports = createAsyncThunk(
  'reportProperties/fetchReports',
  async () => {
    const response = await axios.get(
      'http://localhost:8000/api/report-properties'
    );
    return response.data.data;
  }
);

export const deleteReport = createAsyncThunk(
  'reportProperties/deleteReport',
  async (id) => {
    await axios.delete(
      `http://localhost:8000/api/report-properties/deleteReport/${id}`
    );
    return id;
  }
);

export const deleteProperty = createAsyncThunk(
  'reportProperties/deleteProperty',
  async (id) => {
    await axios.delete(
      `http://localhost:8000/api/report-properties/deleteProperty/${id}`
    );
    return id;
  }
);

const reportPropertiesSlice = createSlice({
  name: 'reportProperties',
  initialState: {
    reports: [],
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
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports = state.reports.filter(
          (report) => report.id !== action.payload
        );
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.reports = state.reports.filter(
          (report) => report.property.id !== action.payload
        );
      });
  },
});

export default reportPropertiesSlice.reducer;
