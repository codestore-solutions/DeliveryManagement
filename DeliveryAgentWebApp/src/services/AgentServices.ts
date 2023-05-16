import { ApiContants } from "../constants/ApiContants";
import HttpsServices from "./HttpsServices";

let AgentInstance: AgentServices;

class AgentServices {
  private HttpsIntance = HttpsServices.getAxiosInstance();

  static getInstance() {
    if (AgentInstance instanceof AgentServices) {
      return AgentInstance;
    } else {
      return new AgentServices();
    }
  }

  getAgentsList = async () => {
    let url = ApiContants.getAgentList;
    console.log("endpint", url);
    let response = await this.HttpsIntance.getRequest(url);
    return response;
  };
}

export default AgentServices;
