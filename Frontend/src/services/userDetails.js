import secureLocalStorage from 'react-secure-storage';
import axios from '../axiosConfig';

const fetchUsers = async () => {
  const response = await axios.get('/users');
  return response.data;
};

const deleteUser = async (userId) => {
  await axios.delete(`/users/${userId}`);
  return userId;
};

const getUser = async () => {
  const response = await axios.get('/api/profile', {
    headers: {
      Authorization: `Bearer ${secureLocalStorage.getItem('token')}`,
    },
  });
  return response;
};

const updateUser = async (data) => {
  const response = await axios.put('/api/users/update', data, {
    headers: {
      Authorization: `Bearer ${secureLocalStorage.getItem('token')}`,
    },
  });
  return response;
};

const updatePassword = async (data) => {
  const response = await axios.put('/api/users/updatePassword', data, {
    headers: {
      Authorization: `Bearer ${secureLocalStorage.getItem('token')}`,
    },
  });
  return response;
};
export { fetchUsers, deleteUser, getUser, updateUser, updatePassword };
