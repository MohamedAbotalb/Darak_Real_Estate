import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

export const fetchUserProperties = createAsyncThunk(
  'userProperties/fetchUserProperties',
  async () => {
    const response = await axios.get('/properties/user-properties');
    return response.data.data;
  }
);

export const deleteProperty = createAsyncThunk(
  'userProperties/deleteProperty',
  async (propertyId) => {
    await axios.delete(`/properties/${propertyId}`);
    return propertyId;
  }
);

const userPropertySlice = createSlice({
  name: 'userProperties',
  initialState: {
    userProperties: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProperties = action.payload || [];
      })
      .addCase(fetchUserProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.userProperties = state.userProperties.filter(
          (property) => property.id !== action.payload
        );
      });
  },
});

export default userPropertySlice.reducer;
