import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers as fetchUsersService } from '../services/userDetails';

export const fetchUsers = createAsyncThunk(
  'userDetails/fetchUsers',
  async () => {
    const response = await fetchUsersService();
    return response;
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userDetailsSlice.reducer;
