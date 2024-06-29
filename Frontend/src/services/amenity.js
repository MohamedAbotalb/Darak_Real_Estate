import axios from './axiosConfig';

const fetchAmenities = async () => {
  const response = await axios.get('/amenities');
  return response.data;
};

const addAmenity = async (newAmenity) => {
  const response = await axios.post('/amenities', newAmenity);
  return response.data;
};

const deleteAmenity = async (amenitySlug) => {
  await axios.delete(`/amenities/${amenitySlug}`);
  return amenitySlug;
};

const updateAmenity = async (slug, name) => {
  const response = await axios.put(`/amenities/${slug}`, { name });
  return response.data;
};

export { fetchAmenities, addAmenity, deleteAmenity, updateAmenity };
