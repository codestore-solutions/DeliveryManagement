import axios from 'axios';
import { message } from 'antd';

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    return config;
  },
  (error) => {
    // Handle request error here
    message.error('Request Error: Please check your request');
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // You can modify the response data here if needed
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { data } = response;
      const errorMessage = data.error || 'An error occurred';
      // Display error message
      message.error(errorMessage);
    } else {
      // Network error
      message.error('Network Error');
    }

    return Promise.reject(error);
  }
);

export default instance;
