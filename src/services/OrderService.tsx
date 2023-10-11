import API from "./ApiService";
import { ApiConstants } from '../constants/ApiConstants';
import { storesIds } from "../../dummyData";
import { message } from "antd";
import { updateOrderStatusByAgent } from "../utils/types";

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

const updateOrderByAgent = async (payload: updateOrderStatusByAgent) => {
  let url = `${ApiConstants.orderProcessingbaseUrl}${ApiConstants.updateOrderByAgent}`;
  let res = await API(payload, url, "PUT");
  if (res?.status === ApiConstants.successCode) {
    message.success("Agent Assigned Sucessfully");
  }
  return res?.data;
};

const getOrderTimeline = async (id: number) => {
  let url = `${ApiConstants.orderProcessingbaseUrl}${ApiConstants.getOrderTimeLine}/${id}`;
  let res = await API({}, url, "GET");
  return res?.data;
}


const getTimSlotsByIds = async (params: { slotIds: number[] }) => {
  let url = `${ApiConstants.baseUrl}${ApiConstants.getTimeSlots}`;
  // Constructing the query string from the array of ids
  let queryString = params.slotIds.map(id => `slotIds=${id}`).join('&');
  url = `${url}?${queryString}`;
  console.log("Constructed URL:", url);
  let res = await API({}, url, "GET");
  return res?.data;
}





const OrderService = {
  getAvailableOrdersList,
  getAssignedOrdersList,
  getOrderDetailsById,
  updateOrder,
  getOrderTimeline,
  getTimSlotsByIds,
  updateOrderByAgent
};

export default OrderService;