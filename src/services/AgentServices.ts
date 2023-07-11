import {ApiConstant} from '../constant/ApiConstant';
import {
  personalDetailInterface,
  vechleDteailInterface,
} from '../utils/types/UserTypes';
import API from './ApiBase';
import Toast from 'react-native-toast-message';

const AgentServices = {
  getAgentDetails: async (id: string, endPoint: string) => {
    const url = `${ApiConstant.baseUrl}${endPoint}?agentId=${id}`;
    const res = await API({}, url, 'GET');
    return res?.data;
  },
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

  addVechileDetails: async (payload: vechleDteailInterface) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.addvechileDetailendpoint}`;
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
  updateVechileDetail: async (payload: vechleDteailInterface, id: number) => {
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

  verifyAgent: async (params: any) => {},
};

export default AgentServices;
