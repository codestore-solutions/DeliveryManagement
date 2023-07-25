import {ApiConstant} from '../constant/ApiConstant';
import API from './ApiBase';
import Toast from 'react-native-toast-message';

const OrderServices = {
  // Get All Details of Agent
  getDeliveryRquests: async (payload: any, data: any) => {
    const url = `${ApiConstant.orderUrl}${ApiConstant.getOrderRequest}/${data?.id}`;
    let params = {
      page: payload?.page,
      pageSize: payload?.pageSize,
      orderStatus: payload?.status,
    };
    const res = await API({}, url, 'GET', params, data?.jwtToken);
    return res?.data;
  },
  // Aceept Order
  accpetDeliveryRequest: async () => {},
  // Aceept Order
  ignoreDeliveryRequest: async () => {},
};

export default OrderServices;
