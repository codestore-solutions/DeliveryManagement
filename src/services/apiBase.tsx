import {useNavigation} from '@react-navigation/native';
import {ApiConstant} from '../constant/ApiConstant';
import {constant} from '../constant/GenralConstant'
import axios from '../utils/intercepters/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Api base structure
export default async function API(
  payload: Object,
  endpoint: string,
  apiMethod: string,
  cancelToken?: any,
) {
  console.debug('Bearer CALLED');
  let init: Object = {};
  switch (apiMethod) {
    case 'GET':
      init = {
        method: 'GET',
        url: `${ApiConstant.baseUrl}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
        },
        // cancelToken: cancelToken,
      };
      break;

    case 'DELETE':
      init = {
        method: 'DELETE',
        url: `${ApiConstant.baseUrl}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      break;

    case 'PUT':
      init = {
        method: 'PUT',
        url: `${ApiConstant.baseUrl}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: JSON.stringify(payload),
      };
      break;

    case 'POST':
        init = {
          method: apiMethod,
          url: `${ApiConstant.baseUrl}${endpoint}`,
          headers: {
            'Content-Type': 'application/json',
             Accept: 'application/json',
          },
          data: JSON.stringify(payload),
        };
      break;
  }
  console.info('Api URL ::', `${ApiConstant.baseUrl}${endpoint}`);
  return axios(init)
    .then(res => {
      return res;
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        const apiData = {
          status: error.response.status,
          data: error.response.data,
        };
        if (error.response?.status === ApiConstant.unAuthorizedCode) {
          unAuthorized();
        }
        return apiData;
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
    });
}

export const unAuthorized = () => {
    AsyncStorage.removeItem(constant.token);
    AsyncStorage.removeItem(constant.loginUserDetail);
};
