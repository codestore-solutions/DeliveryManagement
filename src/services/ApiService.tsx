import { ApiConstants } from "../constants/ApiConstants";
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
  apiMethod: string,
  params?: any,
  formData?: any
) {
  let auth = UserStorage.getUser();
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
     if(endpoint !== ApiConstants.baseUrl + ApiConstants.uploadImage){
       init = {
         method: apiMethod,
         url: `${endpoint}`,
         headers: {
           "Content-Type": "application/json",
           Authorization: auth ? "Bearer " + auth : "",
         },
         data: JSON.stringify(payload),
       };
     }else{
      init = {
          method: apiMethod, 
          url: `${endpoint}`,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: auth ? "Bearer " + auth : "",
          },
          data: formData,
      };
     }
      break;
  }
  console.log("Api URL ::" , `${endpoint}`, init);

  return axios(init)
    .then((res) => {
      return res;
    })
    .catch(function (error) {
      throw error;
    });
}
