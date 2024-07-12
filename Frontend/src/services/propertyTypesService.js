import axios from 'services/axiosConfig';

export const getAllPropertyTypes = () => axios.get('/property-types');

export const getPropertyTypeBySlug = (typeSlug) =>
  axios.get(`/property-types/${typeSlug}`);

export const addPropertyType = (data) => axios.post('/property-types', data);

export const editPropertyType = (slug, data) =>
  axios.put(`/property-types/${slug}`, data);

export const deletePropertyType = (slug) =>
  axios.delete(`/property-types/${slug}`);
