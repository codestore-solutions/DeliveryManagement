import axios from 'axios';
import Toast from 'react-native-toast-message';
import {ApiConstant} from '../../constant/ApiConstant';

const instance = axios.create();

instance.interceptors.request.use(
  config => {
    // You can modify the request config here if needed
    return config;
  },
  error => {
    // Handle request error here
    Toast.show({
      type: 'error',
      text1: 'Request Error: Please check your request',
    });
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // You can modify the response data here if needed
    return response;
  },
  error => {
    console.log('cdvvcvcxvcxv', error);
    let apiData = {
        status: 503,
        data: "Service Unavailable"
    }as any;
    if (error && error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log('status', error.response.status);
      console.log(error.response.headers);

      if (error.response.status === ApiConstant?.badRequest) {
        // Handle validation errors
        if(error.response.data?.message){
          Toast.show({
            type: 'error',
            text1:error.response.data?.message ,
          });
        }else{
          const validationErrors = error.response.data;
          let errorMessages = new Array<any>();
          // Loop through the error object and extract error messages
          for (const key in validationErrors) {
            if (Array.isArray(validationErrors[key])) {
              errorMessages = errorMessages.concat(validationErrors[key]);
            } else if (typeof validationErrors[key] === 'string') {
              errorMessages.push(validationErrors[key]);
            }
          }
          if (errorMessages.length > 0) {
            // Display error messages to the user
            Toast.show({
              type: 'error',
              text1: `${errorMessages[1]}`,
            });
            // apiData?.data = errorMessages;
          }
        }
      } else if (error.response.status === ApiConstant.notFound) {
         apiData = {
          status: error.response.status,
          data: error.response.data.message,
        };
        // Toast.show({
        //   type: 'error',
        //   text1: `${apiData.status} ${apiData?.data}`,
        // });
      }else if (error.response.status === ApiConstant.internalServerError) {
         apiData = {
          status: error.response.status,
          data: error.response.data,
        };
        Toast.show({
          type: 'error',
          text1: `${apiData.status} ${apiData?.data}`,
        });
      }
      else if (error.response?.status === ApiConstant.unAuthorizedCode) {
        // unAuthorized();
        // navigate('/');
        apiData = {
          status: error.response.status,
          data: "Unauthorized",
        };
        Toast.show({
          type: 'error',
          text1: `${apiData.status} ${apiData?.data}`,
        });
      }else
       {
        // Handle other types of errors
        //  apiData = {
        //   status: error.response.status,
        //   data: error.response.data,
        // };
        // if (error.response?.status === ApiConstant.unAuthorizedCode) {
        //   // unAuthorized();
        //   // navigate('/');
        // }
        Toast.show({
          type: 'error',
          text1: `${apiData.status} ${apiData?.data}`,
        });
      }
    } else if (error.request) {
      console.info(
        'The request was made but no response was received ',
        error.request,
      );
    } else {
      console.log(
        'Something happened in setting up the request that triggered an Error ',
        error.message,
      );
    }
   return Promise.reject(apiData);
  },
);

export default instance;
