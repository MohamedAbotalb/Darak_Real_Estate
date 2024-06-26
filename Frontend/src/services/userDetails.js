// services/userDetails.js
import axios from '../axiosConfig';

const fetchUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

const deleteUser = async (userId) => {
  await axiosInstance.delete(`/users/${userId}`);
  return userId;
};

export { fetchUsers, deleteUser };
