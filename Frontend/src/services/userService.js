import axios from './axiosConfig';

export const getUserDetails = () => {
  return axios.get('/profile');
};

export const updateUserDetails = (userData) => {
  return axios.put('/users/update', userData);
};

export const updateUserPassword = (passwordData) => {
  return axios.put('/users/updatePassword', passwordData);
};

export const deleteUserAccount = () => {
  return axios.delete('/users/delete');
};
