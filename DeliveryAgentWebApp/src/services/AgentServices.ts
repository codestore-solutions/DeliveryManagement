import { message } from "antd";
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
  getAgentsList = async (pageNumber: Number, limit: Number) => {
    let url = `${ApiContants.getAgentList}?pageNumber=${pageNumber}&limit=${limit}`;
    let response = await this.HttpsIntance.getRequest(url);
    return response?.data;
  };
  
  assignOrderToAgent = async (payload: any) => {
    const url = ApiContants.assignOrder;
    let response = await this.HttpsIntance.postRequest(url, payload);
    if (response?.status === ApiContants.successCode) {
      message.success("Agent Assigned Sucessfully.");
    }
    return response;
  };
}

export default AgentServices;
