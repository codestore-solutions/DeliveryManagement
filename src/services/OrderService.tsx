import API from "./ApiService";
import { ApiContants } from '../constants/ApiContants';
import { storesIds } from "../../dummyData";
import { message } from "antd";

/**
 * @param pagination
 * @returns array of available orders
 */
const getAvailableOrdersList = async (pagination: any) => {
  const { pageNumber, pageSize } = pagination;
  let params = {
    storeIds: storesIds,
    page: pageNumber,
    pageSize: pageSize,
    orderStatus:['packing_completed']
  };
  let url = `${ApiContants.orderProcessingbaseUrl}${ApiContants.getAvailableOrders}`;

  let res = await API({}, url, "GET", params);
  let count = 1;
  
  let fromattedList = res?.data?.data?.list?.map((item:any) =>{
        return {...item, key: count++}
  });
  const response = {
      total: res?.data?.data?.total,
      list: fromattedList
  }
  return response;
};

/**
 * @param pagination
 * @returns array of available orders
 */
const getAssignedOrdersList = async (pagination: any, status:any) => {
  const { pageNumber, pageSize } = pagination;
  let params = {
    storeIds: storesIds,
    page: pageNumber,
    pageSize: pageSize,
    orderStatus:[status]
  };
  let url = `${ApiContants.orderProcessingbaseUrl}${ApiContants.getAvailableOrders}`;

  let res = await API({}, url, "GET", params);
  let count = 1;
  console.log("React", res?.data);
  let fromattedList = res?.data?.data?.list?.map((item:any) =>{
        return {...item, key: count++}
  });

  const response = {
      status: res?.status,
      data:{
        total: res?.data?.data?.total,
        list: fromattedList
      }
  }
  return response;
};


/** 
 * @param id OrderId For getting details of given order
 * @returns object of OrderDteails
 */
const getOrderDetailsById = async (id: string | undefined) => {
  let url = `${ApiContants.orderProcessingbaseUrl}${ApiContants.getOrderDetailsById}/${id}`;
  let res = await API({}, url, "GET");
  return res?.data;
};

/** 
 * @param id OrderId For getting details of given order
 * @returns object of OrderDteails
 */
const updateOrder = async (payload: any) => {
  let url = `${ApiContants.orderProcessingbaseUrl}${ApiContants.updateOrder}`;
  let res = await API(payload, url, "PUT");
  if(res?.status === ApiContants.successCode){
    message.success("Agent Assigned Sucessfully");
  }
  let response = {
     status: res.status,
     data: res.data
  }
  console.log("Res", res);
  return response;
};

const OrderService = {
  getAvailableOrdersList,
  getAssignedOrdersList,
  getOrderDetailsById,
  updateOrder
};

export default OrderService;
