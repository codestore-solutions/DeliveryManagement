import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
// import { showToast } from '../../store/toastSlice';
import { ApiConstant } from '../../constant/ApiConstant';

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
    // const dispatch = useDispatch();
    // dispatch(showToast({ type: 'fail', message: 'Fail message!' }));
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
   
    let apiData = {
      status: ApiConstant.errorCode,
      data: 'Network Error',
    };
    if (error && error.response) {
      // Request made and server responded
      console.log("Errorsavc", error);
      console.log("Errorsavc",error.response.data.errors);
      console.log(error.response.status);
      console.log(error.response.headers);
      apiData = {
        status: error.response.status,
        data: error.response.data.errors?.agentId ? error.response.data.errors?.agentId : error.response.data,
      };
      if (error.response?.status === ApiConstant.unAuthorizedCode) {
        // unAuthorized();
        // navigate('/');
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
    // Handle request error here
    Toast.show({
      type: 'error',
      text1: `${apiData?.data} ${apiData.status}`,
    });
    // const dispatch = useDispatch();
    // dispatch(showToast({ type: 'fail', message: apiData?.data }));
    return Promise.reject(apiData);
  },
);

export default instance;
