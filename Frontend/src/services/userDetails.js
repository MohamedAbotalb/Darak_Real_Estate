import axios from '../axiosConfig';

const fetchUsers = async () => {
  const response = await axios.get('/users');
  return response.data;
};

const deleteUser = async (userId) => {
  await axios.delete(`/users/${userId}`);
  return userId;
};

export { fetchUsers, deleteUser };
