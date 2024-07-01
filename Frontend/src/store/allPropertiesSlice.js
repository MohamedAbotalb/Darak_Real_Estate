import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getAllProperties from 'services/allPropertiesService';

export const fetchAllProperties = createAsyncThunk(
  'property/fetchAllProperties',
  async ({ rejectWithValue }) => {
    try {
      const data = await getAllProperties();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  properties: [],
  filteredProperties: [],
  status: 'idle',
  error: null,
};

const allPropertiesSlice = createSlice({
  name: 'allProperties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allPropertiesSlice.reducer;
