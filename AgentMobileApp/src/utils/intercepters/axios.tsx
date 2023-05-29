import axios from 'axios';
import Toast from 'react-native-toast-message';
const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    return config;
  },
  (error) => {
    // Handle request error here
    Toast.show({
      type: 'error',
      text2: 'Request Error: Please check your request'
    });
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
      Toast.show({
        type: 'error',
        text2: errorMessage
      });
    } else {
      // Network error
      Toast.show({
        type: 'error',
        text2: 'Network Error'
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
