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
    let id = 1224;
    let url = `${ApiContants.getAgentList}/${id}?verStatus=2&pageNumber=${pageNumber}&limit=${limit}`;
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
  assignBulkOrderToAgent = async (payload: any) => {
    const url = ApiContants.assignOrderInBulk;
    let response = await this.HttpsIntance.postRequest(url, payload);
    if (response?.status === ApiContants.successCode) {
      message.success("Agents Assigned Sucessfully.");
    }
    return response;
  };

  getAssignedAgents = async(pageNumber?: Number, limit?: Number) =>{
       let id = 1224;
       const url = `${ApiContants.getAssignedAgent}?pageNumber=${pageNumber}&limit=${limit}`;
       let response = await this.HttpsIntance.getRequest(url);
       console.log("datadsgrgrdgfd", response?.data);
      return response?.data;
  }

  verifyAgent = async(id: any) =>{
      
  }

}

export default AgentServices;
