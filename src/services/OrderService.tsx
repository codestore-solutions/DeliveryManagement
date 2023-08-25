import API from "./ApiService";
import { ApiConstants } from '../constants/ApiConstants';
import { storesIds } from "../../dummyData";
import { message } from "antd";

/**
 * @param pagination
 * @returns array of available orders
 */
const getAvailableOrdersList = async (pagination: any) => {
  const { pageNumber, pageSize } = pagination;
  let params = {
    vendorIds: storesIds,
    page: pageNumber,
    pageSize: pageSize,
    orderStatus: [4, 7]
  };
  let url = `${ApiConstants.orderProcessingbaseUrl}${ApiConstants.getAvailableOrders}`;

  let res = await API({}, url, "GET", params);
  let count = 1;
   console.log('res.data', res.data.data.totalOrders)
  let formattedList = res?.data?.data?.list?.map((item: any) => {
    return { ...item, key: count++ }
  });
  const response = {
    total: res?.data?.data?.totalOrders,
    list: formattedList
  }
  return response;
};

/**
 * @param pagination
 * @returns array of available orders
 */
const getAssignedOrdersList = async (pagination: any, status: any) => {
  const { pageNumber, pageSize } = pagination;
  let params = {
    vendorIds: storesIds,
    page: pageNumber,
    pageSize: pageSize,
    orderStatus: status
  };
  let url = `${ApiConstants.orderProcessingbaseUrl}${ApiConstants.getAvailableOrders}`;

  let res = await API({}, url, "GET", params);
  let count = 1;
  let formattedList = res?.data?.data?.list?.map((item: any) => {
    return { ...item, key: count++ }
  });
  const response = {
    status: res?.status,
    data: {
      total: res?.data?.data?.totalOrders,
      list: formattedList
    }
  }
  return response;
};


/** 
 * @param id OrderId For getting details of given order
 * @returns object of OrderDetails
 */
const getOrderDetailsById = async (id: string | undefined) => {
  let url = `${ApiConstants.orderProcessingbaseUrl}${ApiConstants.getOrderDetailsById}/${id}`;
  let res = await API({}, url, "GET");
  return res?.data;
};

/** 
 * @param id OrderId For getting details of given order
 * @returns object of OrderDteails
 */
const updateOrder = async (payload: any) => {
  let url = `${ApiConstants.orderProcessingbaseUrl}${ApiConstants.updateOrder}`;
  let res = await API(payload, url, "PUT");
  if (res?.status === ApiConstants.successCode) {
    message.success("Agent Assigned Sucessfully");
  }
  let response = {
    status: res.status,
    data: res.data
  }
  console.log("Res", res);
  return response;
};


const getOrderTimeline = async (id: number) => {
  let url = `${ApiConstants.orderProcessingbaseUrl}${ApiConstants.getOrderTimeLine}/${id}`;
  let res = await API({}, url, "GET");
  return res?.data;
}



const OrderService = {
  getAvailableOrdersList,
  getAssignedOrdersList,
  getOrderDetailsById,
  updateOrder,
  getOrderTimeline
};

export default OrderService;
