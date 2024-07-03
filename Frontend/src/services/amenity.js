import axios from 'services/axiosConfig';
import { toast } from 'react-toastify';

const fetchAmenities = async () => {
  const response = await axios.get('/amenities');
  return response.data.data;
};

const addAmenity = async (data) => {
  try {
    const response = await axios.post('/amenities', data);
    toast.success('Amenity added successfully');
    return response.data;
  } catch (error) {
    toast.error('Failed to add amenity.');
    throw error;
  }
};

const deleteAmenity = async (slug) => {
  try {
    await axios.delete(`/amenities/${slug}`);
    toast.success('Amenity deleted successfully');
  } catch (error) {
    toast.error('Failed to delete amenity.');
    throw error;
  }
};

const updateAmenity = async (slug, data) => {
  try {
    const response = await axios.put(`/amenities/${slug}`, data);
    toast.success('Amenity updated successfully');
    return response.data;
  } catch (error) {
    toast.error('Failed to update amenity.');
    throw error;
  }
};

export { fetchAmenities, addAmenity, deleteAmenity, updateAmenity };
