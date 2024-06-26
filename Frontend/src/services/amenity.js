import axiosInstance from '../axiosConfig';

const fetchAmenities = async () => {
  const response = await axiosInstance.get('/amenities');
  return response.data;
};

const addAmenity = async (newAmenity) => {
  const response = await axiosInstance.post('/amenities', newAmenity);
  return response.data;
};

const deleteAmenity = async (amenityId) => {
  await axiosInstance.delete(`/amenities/${amenityId}`);
  return amenityId;
};

export { fetchAmenities, addAmenity, deleteAmenity };
