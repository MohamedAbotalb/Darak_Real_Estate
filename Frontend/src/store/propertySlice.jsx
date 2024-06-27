import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig';

export const fetchProperty = createAsyncThunk(
  'property/fetchProperty',
  async (slug) => {
    const response = await axios.get(`/properties/${slug}`);
    return response.data.data;
  }
);

export const addProperty = createAsyncThunk(
  'property/addProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/properties', propertyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    property: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperty.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.property = action.payload;
        state.error = null;
      })
      .addCase(fetchProperty.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProperty.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.property = action.payload;
        state.error = null;
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearState } = propertySlice.actions;
export default propertySlice.reducer;
