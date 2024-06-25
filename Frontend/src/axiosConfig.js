import axios from 'axios';

// Function to get the CSRF token from meta tag
const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : null;
};

// Fetch the CSRF cookie using sanctum/csrf-cookie endpoint
const fetchCsrfToken = async () => {
  await axios.get('http://localhost:8000/sanctum/csrf-cookie');
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

// Request interceptor to attach the CSRF token
axiosInstance.interceptors.request.use(async (config) => {
  await fetchCsrfToken(); // Ensure CSRF token is fetched before each request
  const token = getCsrfToken();
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
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
