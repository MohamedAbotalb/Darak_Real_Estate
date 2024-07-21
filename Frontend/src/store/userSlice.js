import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import secureLocalStorage from 'react-secure-storage';
import {
  getUserDetails,
  updateUserName,
  updateUserPassword,
  updateUserPhone,
  updateUserAvatar,
  deleteUserAccount,
} from 'services/userService';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await getUserDetails();
  return response.data;
});

export const updateName = createAsyncThunk(
  'user/updateName',
  async (userName) => {
    const response = await updateUserName(userName);
    secureLocalStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (passwordData) => {
    const response = await updateUserPassword(passwordData);
    secureLocalStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }
);

export const updatePhone = createAsyncThunk(
  'user/updatePhone',
  async (phoneData) => {
    const response = await updateUserPhone(phoneData);
    secureLocalStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (avatarData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarData);
      formData.append('_method', 'PUT');

      const response = await updateUserAvatar(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      secureLocalStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
  await deleteUserAccount();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePhone.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePhone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updatePhone.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = { ...state.user, avatar: action.payload.user.avatar };
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
