import UserHelper from './../utils/helpers/user';
import {ApiConstant} from '../constant/ApiConstant';
import {loginPayload, updateProfileInterface} from '../utils/types/UserTypes';
import API from './ApiBase';

const UserService = {
  loginUser: async (payload: loginPayload) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.loginEndpoint}`;
    console.log('p', payload)
    const res = await API(payload, url, 'POST');
    if (res?.status === ApiConstant.successCode) {
      UserHelper.storeUser(res?.data);
    }
    console.log('res', res);
    return res?.data;
  },
  getUserDetails: async (id: number) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.agentDetails}`;
    let params = {
      agentId: id,
    };
    const res = await API({}, url, 'GET', params);
    return res?.data;
  },
  getUserProfileStatus: async (id: number) =>{
    const url = `${ApiConstant.baseUrl}${ApiConstant.agentProfileStatus}`;
    let params = {
      agentId: id,
    };
   console.log('Api calling err', params )
    const res = await API({}, url, 'GET', params);
    return res?.data;
  },
  updateProfileStatus: async(payload: updateProfileInterface) =>{
    const url = `${ApiConstant.baseUrl}${ApiConstant.updateProfileStatus}`;
    const res = await API(payload, url, 'PUT');
    console.log('UPDATEdata', res?.data)
    return res?.data;
  }
};

export default UserService;
