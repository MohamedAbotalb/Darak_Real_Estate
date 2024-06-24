import axios from 'axios';

const getCsrfToken = () => {
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta ? meta.getAttribute('content') : null;
};

const fetchCsrfToken = async () => {
  await axios.get('http://localhost:8000/sanctum/csrf-cookie');
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  await fetchCsrfToken();
  const token = getCsrfToken();
  if (token) {
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
