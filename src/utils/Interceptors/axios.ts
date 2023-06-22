import axios from "axios";
import { message } from "antd";
import { ApiContants } from "../../constants/ApiContants";

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    return config;
  },
  (error) => {
    // Handle request error here
    message.error("Request Error: Please check your request");
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
    let apiData = {
      status: ApiContants.errorCode,
      data: "Network Error"
    };
    if (error && error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      apiData = {
        status: error.response.status,
        data: error.response.data,
      };
      if (error.response?.status === ApiContants.unAuthorizedCode) {
        // unAuthorized();
        // navigate('/');
      }
    } else if (error.request) {
      console.info(
        "The request was made but no response was received ",
        error.request
      );
    } else {
      console.log(
        "Something happened in setting up the request that triggered an Error ",
        error.message
      );
    }
    // console.log("Api dtaa", apiData);
    message.error(apiData?.data);
    return Promise.reject(apiData);
  }
);

export default instance;
