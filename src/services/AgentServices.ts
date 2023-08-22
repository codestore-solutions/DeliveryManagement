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
  getAgentDetails: async (id: string, endPoint: string) => {
    const url = `${ApiConstant.baseUrl}${endPoint}?agentId=${id}`;
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
    // console.log('updated', payload, id);
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
    console.log('p', payload);
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
    console.log('p', payload);
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
    console.log('p', payload);
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

  
  
};

export default AgentServices;
