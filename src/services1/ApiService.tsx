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
  params?: any
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
          Accept: "application/json",
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
          Accept: "application/json",
        },
        data: JSON.stringify(payload),
      };
      break;
  }
  console.log("Api URL ::", `${endpoint}`);

  return axios(init)
    .then((res) => {
      return res;
    })
    .catch(function (error) {
      throw error;
    });
}
