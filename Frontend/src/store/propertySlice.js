import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';
import {
  getAllPropertiesService,
  getPropertyService,
  addPropertyService,
  updatePropertyService,
  deletePropertyService,
} from 'services/propertyService';

export const fetchProperty = createAsyncThunk(
  'property/fetchProperty',
  async (slug) => {
    const response = await getPropertyService(slug);
    return response.data.data;
  }
);

export const fetchProperties = createAsyncThunk(
  'property/fetchProperties',
  async () => {
    const response = await getAllPropertiesService();
    return response.data.data;
  }
);

export const addProperty = createAsyncThunk(
  'property/addProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await addPropertyService(propertyData, {
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

export const updateProperty = createAsyncThunk(
  'property/updateProperty',
  async ({ slug, formData }, { rejectWithValue }) => {
    try {
      formData.append('_method', 'PUT');
      const response = await updatePropertyService(slug, formData, {
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
    await deletePropertyService(id);
    return id;
  }
);

export const fetchAcceptedProperties = createAsyncThunk(
  'property/fetchAcceptedProperties',
  async () => {
    const response = await axios.get('/properties/accepted');
    return response.data.data;
  }
);

export const fetchPendingProperties = createAsyncThunk(
  'property/fetchPendingProperties',
  async () => {
    const response = await axios.get('/properties/pending');
    return response.data.data;
  }
);

export const acceptProperty = createAsyncThunk(
  'property/acceptProperty',
  async (propertyId) => {
    const response = await axios.put(`/properties/${propertyId}/status`, {
      status: 'accepted',
    });
    return response.data.data;
  }
);

export const rejectProperty = createAsyncThunk(
  'property/rejectProperty',
  async (propertyId) => {
    const response = await axios.put(`/properties/${propertyId}/status`, {
      status: 'rejected',
    });
    return response.data.data;
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
      .addCase(fetchAcceptedProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAcceptedProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.properties = [];
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(fetchAcceptedProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPendingProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPendingProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.properties = [];
        state.properties = action.payload;
        state.error = null;
      })
      .addCase(fetchPendingProperties.rejected, (state, action) => {
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
      })
      .addCase(acceptProperty.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.properties = state.properties.map((property) =>
          property.id === action.payload.id ? action.payload : property
        );
      })
      .addCase(acceptProperty.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(rejectProperty.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.properties = state.properties.map((property) =>
          property.id === action.payload.id ? action.payload : property
        );
      })
      .addCase(rejectProperty.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { clearState } = propertySlice.actions;
export default propertySlice.reducer;
