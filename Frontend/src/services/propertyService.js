import axios from 'services/axiosConfig';

export const getAllPropertiesService = () => axios.get('/properties');

export const getPropertyService = (slug) => axios.get(`/properties/${slug}`);

export const addPropertyService = (data) => axios.post('/properties', data);

export const updatePropertyService = (slug, data) => {
  axios.post(`/properties/${slug}`, data);
};

export const deletePropertyService = (id) => axios.delete(`/properties/${id}`);
