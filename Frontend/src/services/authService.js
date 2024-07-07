import axios from 'services/axiosConfig';

export const registerApi = (data) => axios.post(`/register`, data);

export const loginApi = (data) => axios.post(`/login`, data);

export const logoutApi = () => axios.get(`/logout`);

export const forgetPasswordApi = (data) => axios.post(`/forget-password`, data);

export const resetPasswordApi = (data) => axios.post(`/reset-password`, data);
