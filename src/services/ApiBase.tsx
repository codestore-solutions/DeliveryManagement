import { ApiContants } from '../constants/ApiContants';
import { GenralContants } from '../constants/GenralConstant';
import axios from '../utils/Interceptors/axios';


// Api base structure
export default async function API(
  payload: Object,
  endpoint: string,
  apiMethod: string,
  // cancelToken?: any,
) {
  // let auth = ""; // Token form Local Storage
  let init: Object = {};
  switch (apiMethod) {
    case 'GET':
      init = {
        method: 'GET',
        url: `${ApiContants.baseUrl}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: auth ? 'Bearer ' + auth : '',
        },
        // cancelToken: cancelToken,
      };
      break;

    case 'DELETE':
      init = {
        method: 'DELETE',
        url: `${ApiContants.baseUrl}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: auth ? 'Bearer ' + auth : '',
        },
      };
      break;

    case 'PUT':
      init = {
        method: 'PUT',
        url: `${ApiContants.baseUrl}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          // Authorization: auth ? 'Bearer ' + auth : '',
          Accept: 'application/json',
        },
        data: JSON.stringify(payload),
      };
      break;

    case 'POST':
        init = {
          method: apiMethod,
          url: `${ApiContants.baseUrl}${endpoint}`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          data: JSON.stringify(payload),
        };
      break;
  }
  console.log('Api URL ::', init, `${ApiContants.baseUrl}${endpoint}`);

  return axios(init)
    .then(res => {
      return res;
    })
    .catch(function (error) {
      console.log(error)
      // if (error.response) {
      //   // Request made and server responded
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      //   const apiData = {
      //     status: error.response.status,
      //     data: error.response.data,
      //   };
      //   if (error.response?.status === ApiContants.unAuthorizedCode) {
      //     unAuthorized();
        
      //   //   navigate('Login'); to Login Page
      //   }
      //   return apiData;
      // } else if (error.request) {
      //   console.info(
      //     'The request was made but no response was received ',
      //     error.request,
      //   );
      // } else {
      //   console.log(
      //     'Something happened in setting up the request that triggered an Error ',
      //     error.message,
      //   );
      // }
    });
}

export const unAuthorized = () => {
    localStorage.removeItem(GenralContants.token);
    localStorage.removeItem(GenralContants.loginUserDetail);
};
