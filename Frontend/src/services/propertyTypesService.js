import axios from 'services/axiosConfig';
import { toast } from 'react-toastify';

const getAllPropertyTypes = async () => {
  const response = await axios.get('/property-types');
  return response.data;
};

const getPropertyTypeBySlug = async (typeSlug) => {
  try {
    const response = await axios.get(`/property-types/${typeSlug}`);
    return response.data;
  } catch (error) {
    toast.error('Failed to fetch property type details.');
    throw error;
  }
};

const addPropertyType = async (data) => {
  try {
    const response = await axios.post('/property-types', data);
    toast.success('Property type added successfully!');
    return response.data;
  } catch (error) {
    toast.error('Failed to add property type.');
    throw error;
  }
};

const editPropertyType = async (slug, data) => {
  try {
    const response = await axios.put(`/property-types/${slug}`, data);
    toast.success('Property type updated successfully!');
    return response.data;
  } catch (error) {
    toast.error('Failed to update property type.');
    throw error;
  }
};

const deletePropertyType = async (slug) => {
  try {
    await axios.delete(`/property-types/${slug}`);
    toast.success('Property type deleted successfully!');
  } catch (error) {
    toast.error('Failed to delete property type.');
    throw error;
  }
};

export {
  getAllPropertyTypes,
  getPropertyTypeBySlug,
  addPropertyType,
  editPropertyType,
  deletePropertyType,
};
