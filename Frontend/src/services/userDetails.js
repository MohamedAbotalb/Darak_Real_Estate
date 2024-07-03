import secureLocalStorage from 'react-secure-storage';
import axios from './axiosConfig';

const fetchUsers = async () => {
  const response = await axios.get('/users');
  return response.data;
};

const getUser = async () => {
  const response = await axios.get('/api/profile', {
    headers: {
      Authorization: `Bearer ${secureLocalStorage.getItem('token')}`,
    },
  });
  return response;
};

export { fetchUsers, getUser };
