import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as propertyTypesService from 'services/propertyTypesService';

export const fetchPropertyTypes = createAsyncThunk(
  'propertyTypes/fetchPropertyTypes',
  async () => {
    return propertyTypesService.getAllPropertyTypes();
  }
);

export const fetchPropertyTypeDetails = createAsyncThunk(
  'propertyTypes/fetchPropertyTypeDetails',
  async (typeSlug) => {
    return propertyTypesService.getPropertyTypeBySlug(typeSlug);
  }
);

export const addPropertyType = createAsyncThunk(
  'propertyTypes/addPropertyType',
  async (data) => {
    return propertyTypesService.addPropertyType(data);
  }
);

export const editPropertyType = createAsyncThunk(
  'propertyTypes/editPropertyType',
  async ({ slug, data }) => {
    return propertyTypesService.editPropertyType(slug, data);
  }
);

export const deletePropertyType = createAsyncThunk(
  'propertyTypes/deletePropertyType',
  async (slug) => {
    await propertyTypesService.deletePropertyType(slug);
    return slug;
  }
);

export const propertyTypesSlice = createSlice({
  name: 'propertyTypes',
  initialState: {
    propertyTypes: [],
    propertyTypeDetails: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch reducers
      .addCase(fetchPropertyTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.propertyTypes = action.payload;
      })
      .addCase(fetchPropertyTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPropertyTypeDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPropertyTypeDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.propertyTypeDetails = action.payload;
      })
      .addCase(fetchPropertyTypeDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPropertyType.fulfilled, (state, action) => {
        state.propertyTypes.push(action.payload);
      })
      .addCase(editPropertyType.fulfilled, (state, action) => {
        const index = state.propertyTypes.findIndex(
          (type) => type.slug === action.payload.slug
        );
        if (index !== -1) {
          state.propertyTypes[index] = action.payload;
        }
      })
      .addCase(deletePropertyType.fulfilled, (state, action) => {
        state.propertyTypes = state.propertyTypes.filter(
          (type) => type.slug !== action.payload
        );
      });
  },
});

export default propertyTypesSlice.reducer;
