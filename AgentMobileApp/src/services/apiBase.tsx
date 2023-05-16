import {useNavigation} from '@react-navigation/native';
import {apiConstant} from '../constant/ApiConstant';
import {constant} from '../constant/GenralConstant'
import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigations/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Api base structure
export default async function API(
  payload: Object,
  endpoint: string,
  apiMethod: string,
  cancelToken?: any,
) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const auth = await AsyncStorage.getItem('token').then((res: any) => {
    if (res) {
      let token = JSON.parse(res);
      return token.access_token;
    } else {
      return 'false';
    }
  });
  // console.debug('Bearer ' + auth);
  let init: Object = {};
  switch (apiMethod) {
    case 'GET':
      init = {
        method: 'GET',
        url: `${apiConstant.baseUrl}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth ? 'Bearer ' + auth : '',
        },
        cancelToken: cancelToken,
      };
      break;

    case 'DELETE':
      init = {
        method: 'DELETE',
        url: `${apiConstant.baseUrl}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth ? 'Bearer ' + auth : '',
        },
      };
      break;

    case 'PUT':
      init = {
        method: 'PUT',
        url: `${apiConstant.baseUrl}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth ? 'Bearer ' + auth : '',
          Accept: 'application/json',
        },
        data: JSON.stringify(payload),
      };
      break;

    case 'POST':
      if (endpoint === apiConstant.loginEndpoint) {
        init = {
          method: apiMethod,
          url: `${apiConstant.baseUrl}${endpoint}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
          data: JSON.stringify(payload),
        };
      } else {
        init = {
          method: apiMethod,
          url: `${apiConstant.baseUrl}${endpoint}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: auth ? 'Bearer ' + auth : '',
            Accept: 'application/json',
          },
          data: JSON.stringify(payload),
        };
      }
      break;
  }
  console.info('Api URL ::', `${apiConstant.baseUrl}${endpoint}`);
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
        if (error.response?.status === apiConstant.unAuthorizedCode) {
          unAuthorized();
          navigation.navigate('Login');
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
