import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

export const fetchUserProperties = createAsyncThunk(
  'userProperties/fetchUserProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/properties/user-properties');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProperty = createAsyncThunk(
  'userProperties/deleteProperty',
  async (propertyId, { rejectWithValue }) => {
    try {
      await axios.delete(`/properties/${propertyId}`);
      return propertyId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
        state.error = action.payload;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.userProperties = state.userProperties.filter(
          (property) => property.id !== action.payload
        );
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userPropertySlice.reducer;
