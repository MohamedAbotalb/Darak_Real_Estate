import axios from 'services/axiosConfig';

export default async (filters) => {
  try {
    const response = await axios.get('/properties/search/filter', filters);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
