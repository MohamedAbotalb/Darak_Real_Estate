import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUsers as fetchUsersService,
  deleteUser as deleteUserService,
} from '../services/userDetails';

export const fetchUsers = createAsyncThunk(
  'userDetails/fetchUsers',
  async () => {
    const response = await fetchUsersService();
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  'userDetails/deleteUser',
  async (userId) => {
    const response = await deleteUserService(userId);
    return response;
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    users: [], // Ensure this is an array
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
        console.log('Fetched users:', action.payload); // Log the payload to ensure it is an array
        state.status = 'succeeded';
        state.users = Array.isArray(action.payload.data)
          ? action.payload.data
          : []; // Ensure it's an array
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userDetailsSlice.reducer;
