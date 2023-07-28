import API from "./ApiService";
import { ApiContants } from "../constants/ApiContants";


/**
 * @param pagination
 * @returns List of All Agents
 */
const getAllAgents = async (
  pagination: any,
  filters: any,
  searchInput: any
) => {
  const { pageNumber, pageSize } = pagination;
  let params = {
    pageNumber: pageNumber,
    limit: pageSize,
    agentStatus: filters?.status,
    // filterOn: searchInput ? "email" : undefined,
    filterQuery: searchInput,
  };
  let url = `${ApiContants.baseUrl}${ApiContants.getAgentList}`;
  const { data } = await API({}, url, "GET", params);
  let count = 1;
  let formattedList = data?.data?.list?.map((item: any) => {
    return { ...item, key: count++ };
  });
  let datafetched = {
    total: data?.data?.total,
    list: formattedList,
  };
  return datafetched;
};

/**
 *
 * @param id delivery Agent Id
 * @returns Details of Delivery Agent
 */
const getAgentDetails = async (id: number) => {
  let params = {
    agentId: id,
  };
  let url = `${ApiContants.baseUrl}${ApiContants.getAgentDteails}`;
  const { data } = await API({}, url, "GET", params);
  return data;
};

/**
 * @param pagination
 * @returns List of All Assigned Agents
 */

const getAvialableAgents = async (pagination: any, searchInput:any) => {
  const { pageNumber, pageSize } = pagination;
  let params = {
    pageNumber: pageNumber,
    limit: pageSize,
    agentStatus: 1,
    filterOn: searchInput ? "email" : undefined,
    filterQuery: searchInput,
  };
  let url = `${ApiContants.baseUrl}${ApiContants.getAgentList}`;
  const { data, status } = await API({}, url, "GET", params);
  let count = 1;
  let formattedList = data?.data?.list?.map((item: any) => {
    return { ...item, key: count++ };
  });
  let datafetched = {
    statusCode: status,
    total: data?.data?.total,
    list: formattedList,
  };
  return datafetched;
};

/**
 * @param payload Object which contain OrderId and BusinessId
 * @returns response message
 */
const assignAgentManually = async (payload: any) => {
  let body = {
     list : payload
  }
  let url = `${ApiContants.baseUrl}${ApiContants.assignAgentManual}`;
  const res = await API(body, url, "POST");
  return res?.data;
};

const assignAgentAutomatically = async (payload: any) => {
  let url = `${ApiContants.baseUrl}${ApiContants.assignAgentAutomatically}`;
  const res = await API(payload, url, "POST");
  return res?.data;
};

const getAddressDetails = async (id: any) => {
  let param = {
    shippingAddressId: id,
  };
  let url = `https://app-orderbooking-dev.azurewebsites.net/api/v1/address/get-address`;
  const res = await API({}, url, "GET", param);
  return res?.data;
};

const getFeedbackDetails = async (id: any) => {
  let url = `${ApiContants.feedbackbaseUrl}${ApiContants.getAgentFeedback}/${id}`;
  const res = await API({}, url, "GET");
  return res?.data;
};

const AgentService = {
  getAllAgents,
  getAgentDetails,
  getAvialableAgents,
  assignAgentManually,
  getAddressDetails,
  assignAgentAutomatically,
  getFeedbackDetails,
};

export default AgentService;
