import {ApiConstant} from '../constant/ApiConstant';
import { acceptRejectInterface, pickupAndDelivery } from '../utils/types/deliveryRequestTypes';
import API from './ApiBase';
import Toast from 'react-native-toast-message';

const OrderServices = {
  // Get All Details of Agent
  getDeliveryRequests: async (payload: any, data: any) => {
    const url = `${ApiConstant.orderUrl}${ApiConstant.getOrderRequest}/${data?.id}`;
    let params = {
      page: payload?.page,
      pageSize: payload?.pageSize,
      orderStatus: payload?.status,
    };
    const res = await API({}, url, 'GET', params, data?.jwtToken);
    return res?.data;
  },
  // Get a Single Delivery Request Details By Id
  getOrderDetailsById: async (id: string | undefined, data:any) => {
    let url = `${ApiConstant.orderUrl}/v1/${ApiConstant.getOrderDetailsById}/${id}`;
    let res = await API({}, url, "GET",{}, data?.jwtToken);
    return res?.data;
  },
  acceptAndRejectDeliveryRequest: async (payload: acceptRejectInterface, data:any) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.acceptAndRejectOrderRequest}`;
    const res = await API(payload, url, 'POST', data?.jwtToken);
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
  pickupAndDeliveryRequest: async (payload: pickupAndDelivery, data:any) => {
    const url = `${ApiConstant.baseUrl}${ApiConstant.pickupAndDelivery}`;
    const res = await API(payload, url, 'PUT', data?.jwtToken);
    if (res?.data.statusCode === ApiConstant.successCode) {
      Toast.show({
        type: 'success',
        text2: res?.data?.message,
      });
    }
    return res?.data;
  },
 getOrderTimeline :async (id: number, data:any) =>{
  console.log('data', data)
    let url = `${ApiConstant.orderUrl}/v1/${ApiConstant.getOrderTimeLine}/${id}`;
    let res = await API({}, url, "GET",{},data?.jwtToken);
    return res?.data;
  }
};

export default OrderServices;
