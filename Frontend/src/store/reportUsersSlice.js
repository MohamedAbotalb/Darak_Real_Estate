/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReports = createAsyncThunk(
  'reportUsers/fetchReports',
  async () => {
    const response = await axios.get('http://localhost:8000/api/report-users');
    return response.data.data;
  }
);

export const deleteReport = createAsyncThunk(
  'reportUsers/deleteReport',
  async (id) => {
    await axios.delete(
      `http://localhost:8000/api/report-users/deleteReport/${id}`
    );
    return id;
  }
);

export const deleteLandlord = createAsyncThunk(
  'reportUsers/deleteLandlord',
  async (id) => {
    await axios.delete(
      `http://localhost:8000/api/report-users/deleteLandlord/${id}`
    );
    return id;
  }
);

const reportUsersSlice = createSlice({
  name: 'reportUsers',
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
      .addCase(deleteLandlord.fulfilled, (state, action) => {
        state.reports = state.reports.filter(
          (report) => report.landlord.id !== action.payload
        );
      });
  },
});

export default reportUsersSlice.reducer;
