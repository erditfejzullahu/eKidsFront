import axios from 'axios';
import store from '@/store/store';

// Create an Axios instance with default configuration
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
      // Get the access token from the store
      const accessToken = store.getters.accessToken;
      // If the access token exists, set the authorization header
      if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
  },
  error => {
      // Handle request error
      return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => {
        // If the response is successful, return it without any changes
        return response;
    },
    error => {
        // If the response status is 401, it indicates unauthorized access
        if (error.response && error.response.status === 401) {
            // Call the refresh token function
            return store.dispatch('refresh').then(() => {
                // After refreshing the token, retry the original request
                return axiosInstance(error.config);
            });
        }
        // For other errors, simply return the error object
        return Promise.reject(error);
    }
);

export default axiosInstance;
