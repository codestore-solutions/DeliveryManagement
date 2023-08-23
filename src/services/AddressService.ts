import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ApiConstant} from '../constant/ApiConstant';
import {addNewWorkingLocationInterface, setLocationInterface} from '../utils/types/addressTypes';
import API from './ApiBase';

const AddressService = {
  addNewWorkingLocation: async (payload: addNewWorkingLocationInterface) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.addNewWorkingLocationEndpoint}`;
    console.log('p', payload);
    const res = await API(payload, url, 'POST');
    console.log('p', res);
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
  getWorkingLocations: async(id: number) =>{
    const url = `${ApiConstant.baseUrl}${ApiConstant.addNewWorkingLocationEndpoint}`;
    let params = {
        deliveryAgentId: id
    }
    const {data, status} = await API({}, url, 'GET', params);
    if (status === ApiConstant.successCode) {
      console.log('Succeed');
    }
    return data;
  },
  deleteWorkingLocations: async(id: number) =>{
    const url = `${ApiConstant.baseUrl}${ApiConstant.addNewWorkingLocationEndpoint}?serviceLocationId=${id}`;
    const {data, status} = await API({}, url, 'DELETE');
    if (status === ApiConstant.successCode) {
      console.log('Succeed', data);
    }
    return data;
  },
  setWorkingLocation: async (payload: setLocationInterface) =>{
    const url = `${ApiConstant.baseUrl}${ApiConstant.changeWorkingLocation}`;
    const {data, status} = await API(payload, url, 'PUT');
    Toast.show({
      type: 'success',
      text2: data?.message,
    });
    console.log('update', data)
    return data;
  },
  getTimeSlots: async() =>{
    const url = `${ApiConstant.baseUrl}${ApiConstant.getTimeSlots}`;
    const {data, status} = await API({}, url, 'GET');
    return data;
  }
};

export default AddressService;
