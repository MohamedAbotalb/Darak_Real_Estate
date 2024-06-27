import axios from 'axios';

const baseURL = 'http://localhost:8000/api';

export const registerApi = (data) => axios.post(`${baseURL}/register`, data);

export const loginApi = (data) => axios.post(`${baseURL}/login`, data);

export const logoutApi = () => axios.get(`${baseURL}/logout`);

export const forgetPasswordApi = (data) =>
  axios.post(`${baseURL}/forget-password`, data);
