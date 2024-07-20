import axios from './axiosConfig';

export const getUserDetails = (userData) => {
  return axios.get('/users/details', userData);
};

export const updateUserName = (nameData) => {
  return axios.put('/users/updateName', nameData);
};

export const updateUserPassword = (passwordData) => {
  return axios.put('/users/updatePassword', passwordData);
};

export const updateUserPhone = (phoneData) => {
  return axios.put('/users/updatePhone', phoneData);
};

export const updateUserAvatar = (avatarData) => {
  return axios.put('/users/updateAvatar', avatarData);
};

export const deleteUserAccount = () => {
  return axios.delete('/users/');
};
