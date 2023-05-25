import {apiConstant} from '../constant/ApiConstant';
import axiosHttpsServices from './httpsServices';

let userInstance: agentServices;

class agentServices {
  private axiosInstance = axiosHttpsServices.getAxiosInstance();
  static getInstance() {
    if (userInstance instanceof agentServices) {
      return userInstance;
    } else {
      return new agentServices();
    }
  }
  createAgentProfile = async (payload: any) => {
    let url = apiConstant.createAgentProfile;
    let result = await this.axiosInstance.postRequest(url, payload);
    return result;
  };
  getAgentProfile = async () => {};
  updateAgentProfile = async (payload: any) => {};
}

export default agentServices;
