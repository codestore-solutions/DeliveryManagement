import axios from "axios";
import { message } from "antd";
import { ApiConstants } from "../../constants/ApiConstants";

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
      status: ApiConstants.errorCode,
      data: "Service Unavailable"
    } as { status: any, data: any };
    if (error && error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === ApiConstants.internalServerError) {
        apiData = {
          status: error.response.status,
          data: error.response.data?.message,
        };
      } else if (error.response.status === ApiConstants?.badRequest) {
        apiData = {
          status: error.response.status,
          data: error.response.data
        }
      } else if (error.response.status?.statusCode === ApiConstants?.badRequest) {
        // Handle validation errors
        const validationErrors = error.response.data;
        let errorMessages = new Array<any>();

        // Loop through the error object and extract error messages
        for (const key in validationErrors) {
          if (Array.isArray(validationErrors[key])) {
            errorMessages = errorMessages.concat(validationErrors[key]);
          } else if (typeof validationErrors[key] === "string") {
            errorMessages.push(validationErrors[key]);
          }
        }

        if (errorMessages.length > 0) {
          // Display error messages to the user
          console.log('err', errorMessages)
          message.error(errorMessages[1]);
          // apiData?.data = errorMessages;
        }
      } else if (error.response.status === ApiConstants?.badRequest) {
        // Handle validation errors
        const validationErrors = error.response.data;
        let errorMessages = new Array<any>();

        // Loop through the error object and extract error messages
        for (const key in validationErrors) {
          if (Array.isArray(validationErrors[key])) {
            errorMessages = errorMessages.concat(validationErrors[key]);
          } else if (typeof validationErrors[key] === "string") {
            errorMessages.push(validationErrors[key]);
          }
        }

        if (errorMessages.length > 0) {
          // Display error messages to the user
          console.log('err', errorMessages)
          apiData = {
            status: error.response.status,
            data: errorMessages[1]
          }
        }
      } 

      else {
        // Handle other types of errors
        apiData = {
          status: error.response.status,
          data: error.response.data,
        };
        if (error.response?.status === ApiConstants.unAuthorizedCode) {
          // unAuthorized();
          // navigate('/');
        }
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
    if(error.response.status !== ApiConstants.notFound){
      message.error(apiData?.data);
    }

    return Promise.reject(apiData);
  }
);

export default instance;
