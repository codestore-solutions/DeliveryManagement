import { ApiContants } from "../constants/ApiContants";
import axios from "../utils/Interceptors/axios";
import UserStorage from "../utils/helpers/UserStorage";

/**
 * @param payload Request Body
 * @param endpoint  End Point Url for Target Api
 * @param apiMethod Http Method Type
 * @param cancelToken  Token require for Remove data Api Validation
 * @returns Genric http methods response
 */
export default async function API(
  payload: Object,
  endpoint: string,
  apiMethod: string
  // cancelToken?: any,
) {
  let auth = UserStorage.getUser();
  let init: Object = {};
  switch (apiMethod) {
    case "GET":
      init = {
        method: "GET",
        url: `${ApiContants.baseUrl}${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: auth ? "Bearer " + auth : "",
        },
        // cancelToken: cancelToken,
      };
      break;

    case "DELETE":
      init = {
        method: "DELETE",
        url: `${ApiContants.baseUrl}${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: auth ? "Bearer " + auth : "",
        },
      };
      break;

    case "PUT":
      init = {
        method: "PUT",
        url: `${ApiContants.baseUrl}${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: auth ? "Bearer " + auth : "",
          Accept: "application/json",
        },
        data: JSON.stringify(payload),
      };
      break;

    case "POST":
      init = {
        method: apiMethod,
        url: `${ApiContants.baseUrl}${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: JSON.stringify(payload),
      };
      break;
  }
  console.log("Api URL ::", auth, `${ApiContants.baseUrl}${endpoint}`);

  return axios(init)
    .then((res) => {
      console.log("Response", res);
      return res;
    })
    .catch(function (error) {
      throw error;
    });
}

/**
 * Remove All Credential from Local Storage
 */
export const unAuthorized = () => {
  localStorage.removeItem(ApiContants.user);
};
