import axios from 'axios';

export const AxiosResponseInterceptors = () => {
  axios.interceptors.response.use(
    res => res,
    error => {
      // Handle Errors
      console.log("Response Error", error);
    },
  );
};