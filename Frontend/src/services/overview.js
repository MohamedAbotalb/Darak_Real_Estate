import axios from '../axiosConfig';

const fetchCounts = async () => {
  const response = await axios.get('/dashboard/home');
  return response.data;
};

export default fetchCounts;
