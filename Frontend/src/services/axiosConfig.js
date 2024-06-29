import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

// Get the CSRF token from meta tag
const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : null;
};

// Fetch the CSRF cookie using sanctum/csrf-cookie endpoint
const fetchCsrfToken = async () => {
  await axios.get('http://localhost:8000/sanctum/csrf-cookie');
};

// Get token from localStorage
const getToken = () => {
  return secureLocalStorage.getItem('token');
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': getCsrfToken(),
    Authorization: `Bearer ${getToken()}`,
  },
  withCredentials: true,
});

// Request interceptor to attach the CSRF token
axiosInstance.interceptors.request.use(async (config) => {
  await fetchCsrfToken();
  const token = getCsrfToken();
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }

  // Fetch updated token if available
  const updatedToken = getToken();
  if (updatedToken) {
    config.headers.Authorization = `Bearer ${updatedToken}`;
  }

  return config;
});

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
