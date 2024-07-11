import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

export const fetchProperty = createAsyncThunk(
  'property/fetchProperty',
  async (slug) => {
    const response = await axios.get(`/properties/${slug}`);
    return response.data.data;
  }
);

export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async () => {
    const response = await axios.get('/properties');
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

export const deleteProperty = createAsyncThunk(
  'properties/deleteProperty',
  async (id) => {
    await axios.delete(`/properties/${id}`);
    return id;
  }
);

export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async ({ slug, propertyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/properties/${slug}`, propertyData, {
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
    properties: [],
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
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.properties = Array.isArray(action.payload)
          ? action.payload
          : Object.values(action.payload);
        state.error = null;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
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
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter(
          (property) => property.id !== action.payload
        );
      })
      .addCase(updateProperty.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.property = action.payload;
        state.error = null;
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearState } = propertySlice.actions;
export default propertySlice.reducer;
