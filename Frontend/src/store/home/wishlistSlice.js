import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchWishlistApi,
  addToWishlistApi,
  removeFromWishlistApi,
} from 'services/wishlistService';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (thunkAPI) => {
    try {
      const response = await fetchWishlistApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (property, thunkAPI) => {
    try {
      const response = await addToWishlistApi({ property_id: property.id });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (id, thunkAPI) => {
    try {
      const response = await removeFromWishlistApi(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.data;
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
