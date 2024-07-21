import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axiosConfig';

// Fetch property updates from API
export const fetchPropertyUpdates = createAsyncThunk(
  'propertyUpdates/fetchPropertyUpdates',
  async () => {
    const response = await axios.get('/property-updates');
    return response.data;
  }
);

// Approve property update by ID
export const approvePropertyUpdate = createAsyncThunk(
  'propertyUpdates/approvePropertyUpdate',
  async (id) => {
    const response = await axios.post(`/property-updates/accepted/${id}`);
    return response.data;
  }
);

// Reject property update by ID
export const rejectPropertyUpdate = createAsyncThunk(
  'propertyUpdates/rejectPropertyUpdate',
  async (id) => {
    const response = await axios.post(`/property-updates/rejected/${id}`);
    return response.data;
  }
);

// Fetch new property details by update ID
export const fetchNewProperty = createAsyncThunk(
  'propertyUpdates/fetchNewProperty',
  async (id) => {
    const response = await axios.get(`/property-updates/${id}/new`);
    return { id, newProperty: response.data.new_data };
  }
);

// Fetch old property details by update ID
export const fetchOldProperty = createAsyncThunk(
  'propertyUpdates/fetchOldProperty',
  async (id) => {
    const response = await axios.get(`/property-updates/${id}/old`);
    return { id, oldProperty: response.data.old_data };
  }
);

// Redux slice
const propertyUpdatesSlice = createSlice({
  name: 'propertyUpdates',
  initialState: {
    updates: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    clearUpdates: (state) => {
      state.updates = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyUpdates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPropertyUpdates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updates = action.payload;
        state.error = null;
      })
      .addCase(fetchPropertyUpdates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(approvePropertyUpdate.fulfilled, (state, action) => {
        const updatedUpdates = state.updates.map((propertyUpdate) =>
          propertyUpdate.id === action.payload.id
            ? action.payload
            : propertyUpdate
        );
        state.updates = updatedUpdates;
        state.error = null;
      })
      .addCase(rejectPropertyUpdate.fulfilled, (state, action) => {
        const updatedUpdates = state.updates.map((propertyUpdate) =>
          propertyUpdate.id === action.payload.id
            ? action.payload
            : propertyUpdate
        );
        state.updates = updatedUpdates;
        state.error = null;
      })
      .addCase(fetchNewProperty.fulfilled, (state, action) => {
        const { id, newProperty } = action.payload;
        const propertyUpdate = state.updates.find((update) => update.id === id);
        if (propertyUpdate) {
          propertyUpdate.newProperty = newProperty;
        }
      })
      .addCase(fetchOldProperty.fulfilled, (state, action) => {
        const { id, oldProperty } = action.payload;
        const propertyUpdate = state.updates.find((update) => update.id === id);
        if (propertyUpdate) {
          propertyUpdate.oldProperty = oldProperty;
        }
      });
  },
});

export const { clearUpdates } = propertyUpdatesSlice.actions;

export default propertyUpdatesSlice.reducer;
