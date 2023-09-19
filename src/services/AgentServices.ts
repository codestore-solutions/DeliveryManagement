import {ApiConstant} from '../constant/ApiConstant';
import {
  bankDetailInterface,
  personalDetailInterface,
  updateAgentStatus,
  vehicleDetailInterface,
} from '../utils/types/UserTypes';
import API from './ApiBase';
import Toast from 'react-native-toast-message';

const AgentServices = {
  // Get All Details of Agent
  getAgentDetails: async (id: string, endPoint: string, masked?: boolean) => {
    console.log('masked', masked)
    const url = `${ApiConstant.baseUrl}${endPoint}?agentId=${id}&masked=${masked}`;
    const res = await API({}, url, 'GET');
    return res?.data;
  },

  // Personal Details Services 
  addPersonalDetail: async (payload: personalDetailInterface) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.addpersonalDetailendpoint}`;
    const res = await API(payload, url, 'POST');
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
  updatePersonalDetail: async (
    payload: personalDetailInterface,
    id: number,
  ) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.updatepersonalDetailendpoint}?id=${id}`;
    console.log('updated', payload, id);
    const res = await API(payload, url, 'PUT');
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
  // KYC Details Services

  addUpdateKycDetails: async (payload: any) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.kycDetailendpoint}`;
    
    const res = await API(payload, url, 'PUT');
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
   // Vechile Details  Services

  addVehicleDetails: async (payload: vehicleDetailInterface) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.addvehicleDetailendpoint}`;
    // console.log('p', payload);
    const res = await API(payload, url, 'POST');
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
  updateVechileDetail: async (payload: vehicleDetailInterface, id: number) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.updatevechileDetailendpoint}?id=${id}`;
    console.log('update Vehicle', url, payload)
    const res = await API(payload, url, 'PUT');
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
  // Bank Detail Services
  addBankDetails: async (payload: bankDetailInterface) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.addbankdetailEndpoint}`;
    // console.log('p', payload);
    const res = await API(payload, url, 'POST');
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
  updatebankDetail: async (payload: bankDetailInterface, id: number) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.updatebankdetailEndpoint}?id=${id}`;
    const res = await API(payload, url, 'PUT');
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
  
  // Change Agent Statua
  updateAgentStatus: async (payload: updateAgentStatus) =>{
    const url = `${ApiConstant.baseUrl}${ApiConstant.updateAgentStatus}`;
    const res = await API(payload, url, 'PUT');
    return res?.data;
  },
  getAgentStatus: async (id: any) =>{
    const url = `${ApiConstant.baseUrl}${ApiConstant.getAgentStatus}`;
    let params = {
      agentId: Number(id)
    }
    const res = await API({}, url, 'GET', params);
    return res?.data;
  },

  getTotalAgentAndDelivery: async (id: number) => {
    let params = {
      agentId: id,
    };
    let url = `${ApiConstant.baseUrl}${ApiConstant.getAgentAndDeliveryCounts}`;
    const res = await API({}, url, "GET", params);
    return res?.data;
  },

 getTimSlotsByIds : async (params: { slotIds: number[] }) => {
    let url = `${ApiConstant.baseUrl}${ApiConstant.getTimeSlotsWithIds}`;
    // Constructing the query string from the array of ids
    let queryString = params.slotIds.map(id => `slotIds=${id}`).join('&');
    url = `${url}?${queryString}`;
    console.log("Constructed URL:", url);
    let res = await API({}, url, "GET");
    return res?.data;
  }
  
};

export default AgentServices;
