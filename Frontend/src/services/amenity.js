import axios from 'services/axiosConfig';

const fetchAmenities = async () => {
  const response = await axios.get('/amenities');
  return response.data.data;
};

const addAmenity = async (data) => {
  const response = await axios.post('/amenities', data);
  return response.data;
};

const deleteAmenity = async (slug) => {
  await axios.delete(`/amenities/${slug}`);
};

const updateAmenity = async (slug, data) => {
  const response = await axios.put(`/amenities/${slug}`, data);
  return response.data;
};

export { fetchAmenities, addAmenity, deleteAmenity, updateAmenity };
