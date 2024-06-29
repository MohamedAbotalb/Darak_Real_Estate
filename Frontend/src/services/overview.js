import axiosInstance from 'services/axiosConfig';

const fetchCounts = async () => {
  const response = await axiosInstance.get('/dashboard/home');
  return response.data;
};

export default fetchCounts;
