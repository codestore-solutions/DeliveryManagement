// import {useNavigation} from '@react-navigation/native';
import {constant} from '../constant/GenralConstant'
import axios from '../utils/intercepters/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @param payload Request Body
 * @param endpoint  End Point Url for Target Api
 * @param apiMethod Http Method Type
 * @param params  Toksen require for Remove data Api Validation
 * @returns Genric http methods response
 */
export default async function API(
  payload: Object,
  endpoint: string,
  apiMethod: string,
  params?: Object
) {
  let auth = '';
  let init: Object = {};
  switch (apiMethod) {
    case "GET":
      init = {
        method: "GET",
        url: `${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: auth ? "Bearer " + auth : "",
        },
        params: params,
      };
      break;

    case "DELETE":
      init = {
        method: "DELETE",
        url: `${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: auth ? "Bearer " + auth : "",
        },
      };
      break;

    case "PUT":
      init = {
        method: "PUT",
        url: `${endpoint}`,
        headers: {
          "Content-Type": "application/json",
           Authorization: auth ? "Bearer " + auth : "",
        },
        data: JSON.stringify(payload),
      };
      break;

    case "POST":
      init = {
        method: apiMethod,
        url: `${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          // Authorization: auth ? "Bearer " + auth : "",
        },
        data: JSON.stringify(payload),
      };
      break;
  }
  console.log("Api URL ::" , `${endpoint}`);

  return axios(init)
    .then((res) => {
      return res;
    })
    .catch(function (error) {
      throw error;
    });
}


export const unAuthorized = () => {
    AsyncStorage.removeItem(constant.token);
    AsyncStorage.removeItem(constant.loginUserDetail);
};
