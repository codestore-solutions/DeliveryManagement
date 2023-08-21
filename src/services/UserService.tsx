import API from "./ApiService";
import { ApiConstants } from "../constants/ApiConstants";
import UserStorage from "../utils/helpers/UserStorage";


/**
 * @param payload User Credentials to Validate User
 * @returns return json object with acess token
 */

const loginUser = async (payload: any) => {
  let url = `${ApiConstants.baseUrl}${ApiConstants.loginEndpoint}`;
  const res = await API(payload, url, "POST");
  console.log("res", res);
  if (res?.status === ApiConstants.successCode) {
    UserStorage.setUser(res.data);
  }
  return res;
}

export default { loginUser };
