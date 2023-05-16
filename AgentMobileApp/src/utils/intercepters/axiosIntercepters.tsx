import axios from 'axios';

export const axiosResponseInterceptors = () => {
  axios.interceptors.response.use(
    res => res,
    error => {
      // Handle Errors
      console.log("Response Error")
    },
  );
};