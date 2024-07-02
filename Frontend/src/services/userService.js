import axios from './axiosConfig';

export const getUserDetails = () => {
  return axios.get('/profile');
};

export const updateUserDetails = (userData) => {
  return axios.put('/users/updateName', userData);
};

export const updateUserPassword = (passwordData) => {
  return axios.put('/users/updatePassword', passwordData);
};

export const updateUserPhone = (phoneData) => {
  return axios.put('/users/updatePhone', phoneData);
};

export const updateUserAvatar = (avatarData) => {
  return axios.put('/users/updateAvatar', avatarData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteUserAccount = () => {
  return axios.delete('/users/delete');
};
