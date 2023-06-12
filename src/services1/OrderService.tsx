import API from "./ApiService";
import { ApiContants } from "../constants/ApiContants";
import { storesIds } from "../../dummyData";

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
  };
  let url = `${ApiContants.orderProcessingbaseUrl}${ApiContants.getAvailableOrders}`;
  let res = await API({}, url, "GET", params);
  return res?.data;
};

/**
 * @param pagination
 * @returns array of assigned orders
 */
const getAssignedOrdersList = async (pagination: any) => {
  const { pageNumber, limit } = pagination;
  let url = `${ApiContants.getAssinedOrders}?pageNumber=${pageNumber}&limit=${limit}`;
  let res = await API({}, url, "GET");
  return res?.data;
};

/**
 * @param pagination
 * @returns array of completed orders
 */

const getCompletedOrdersList = async (pagination: any) => {
  const { pageNumber, limit } = pagination;
  let url = `${ApiContants.getCompletedOrders}?pageNumber=${pageNumber}&limit=${limit}`;
  let res = await API({}, url, "GET");
  return res?.data;
};

const OrderService = {
  getAvailableOrdersList,
  getAssignedOrdersList,
  getCompletedOrdersList,
};

export default OrderService;
