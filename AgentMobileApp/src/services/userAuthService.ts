import { apiConstant } from '../constant/ApiConstant';
import axiosHttpsServices from './httpsServices';

let userInstance: userAuthServices;

class userAuthServices {
  private axiosInstance = axiosHttpsServices.getAxiosInstance();
  static getInstance() {
    if (userInstance instanceof userAuthServices) {
      return userInstance;
    } else {
      return new userAuthServices();
    }
  }
   registerUser = async (payload: any) => {
    const url: string = apiConstant.signupEndpoint;
    console.log("Url", url);
    console.log("Url", payload);
    // let result =  await this.axiosInstance.postRequest(url, payload);
    // return result;
  };
  loginUser = async (payload: any) =>{
    const url: string =  apiConstant.signupEndpoint;
    console.log("Url", url);
    console.log("Url", payload);
     // let result =  await this.axiosInstance.postRequest(url, payload);
    // return result;
  }
}

export default userAuthServices;
