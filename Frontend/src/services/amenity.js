import axios from '../axiosConfig';

const fetchAmenities = async () => {
  const response = await axios.get('/amenities');
  return response.data;
};

const addAmenity = async (newAmenity) => {
  const response = await axios.post('/amenities', newAmenity);
  return response.data;
};

const deleteAmenity = async (amenityId) => {
  await axios.delete(`/amenities/${amenityId}`);
  return amenityId;
};

export { fetchAmenities, addAmenity, deleteAmenity };
