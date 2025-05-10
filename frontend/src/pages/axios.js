import axios from 'axios';

// Create an Axios instance with your API base URL
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  withCredentials: true
});

// Automatically attach the JWT token (if present) to every request
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Optional: handle 401 globally (redirect to login on unauthorized)
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
