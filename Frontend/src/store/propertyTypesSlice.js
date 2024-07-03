import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllPropertyTypes as getAllPropertyTypesService,
  addPropertyType as addPropertyTypeService,
  editPropertyType as editPropertyTypeService,
  deletePropertyType as deletePropertyTypeService,
  getPropertyTypeBySlug as getPropertyTypeBySlugService,
} from 'services/propertyTypesService';

export const fetchPropertyTypes = createAsyncThunk(
  'propertyTypes/fetchPropertyTypes',
  async () => {
    return getAllPropertyTypesService();
  }
);

export const fetchPropertyTypeDetails = createAsyncThunk(
  'propertyTypes/fetchPropertyTypeDetails',
  async (typeSlug) => {
    return getPropertyTypeBySlugService(typeSlug);
  }
);

export const addPropertyType = createAsyncThunk(
  'propertyTypes/addPropertyType',
  async (data) => {
    return addPropertyTypeService(data);
  }
);

export const editPropertyType = createAsyncThunk(
  'propertyTypes/editPropertyType',
  async ({ slug, data }) => {
    return editPropertyTypeService(slug, data);
  }
);

export const deletePropertyType = createAsyncThunk(
  'propertyTypes/deletePropertyType',
  async (slug) => {
    await deletePropertyTypeService(slug);
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
