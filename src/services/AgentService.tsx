import API from "./ApiService";
import { ApiConstants } from "../constants/ApiConstants";
import { verifyAgentKycInterface } from "../utils/types";

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
  let params;
  if (filters == 2) {
    params = {
      pageNumber: pageNumber,
      limit: pageSize,
      filterQuery: searchInput,
    };
  } else {
    params = {
      pageNumber: pageNumber,
      limit: pageSize,
      agentStatus: filters,
      filterQuery: searchInput,
    };
  }

  let url = `${ApiConstants.baseUrl}${ApiConstants.getAgentList}`;
  const { data } = await API({}, url, "GET", params);
  let count = 1;
  let formattedList = data?.data?.list?.map((item: any) => {
    return { ...item, key: count++ };
  });
  let dataFetched = {
    total: data?.data?.total,
    list: formattedList,
  };
  return dataFetched;
};

/**
 * @param id delivery Agent Id
 * @returns Details of Delivery Agent
 */
const getAgentDetails = async (id: number) => {
  let params = {
    agentId: id,
  };
  console.log("data", params);
  let url = `${ApiConstants.baseUrl}${ApiConstants.getAgentDetail}`;
  const { data } = await API({}, url, "GET", params);
  console.log("data", data);
  return data;
};

const verifyAgentKyc = async (payload: verifyAgentKycInterface) => {
  let url = `${ApiConstants.baseUrl}${ApiConstants.verifyAgentKyc}`;
  const res = await API(payload, url, "POST");
  return res?.data;
};

const getVerificationStatus = async (params: { agentId: number }) => {
  let url = `${ApiConstants.baseUrl}${ApiConstants.getVerificationStatus}`;
  const { data } = await API({}, url, "GET", params);
  console.log("data", data);
  return data;
};

/**
 * @param pagination
 * @returns List of All Assigned Agents
 */

const getAvailableAgents = async (pagination: any, searchInput: any) => {
  const { pageNumber, pageSize } = pagination;
  let params = {
    pageNumber: pageNumber,
    limit: pageSize,
    agentStatus: 1,
    filterOn: searchInput ? "email" : undefined,
    filterQuery: searchInput,
  };
  let url = `${ApiConstants.baseUrl}${ApiConstants.getAgentList}`;
  const { data, status } = await API({}, url, "GET", params);
  let count = 1;
  let formattedList = data?.data?.list?.map((item: any) => {
    return { ...item, key: count++ };
  });
  let dataFetched = {
    statusCode: status,
    total: data?.data?.total,
    list: formattedList,
  };
  return dataFetched;
};

const assignAgentManually = async (payload: any) => {
  let body = {
    list: payload,
  };
  let url = `${ApiConstants.baseUrl}${ApiConstants.assignAgentManual}`;
  const res = await API(body, url, "POST");
  return res?.data;
};

const assignAgentAutomatically = async (payload: any) => {
  let url = `${ApiConstants.baseUrl}${ApiConstants.assignAgentAutomatically}`;
  const res = await API(payload, url, "POST");
  return res?.data;
};

const getFeedbackDetails = async (id: any) => {
  let url = `${ApiConstants.feedbackBaseUrl}${ApiConstants.getAgentFeedback}/${id}`;
  const res = await API({}, url, "GET");
  return res?.data;
};

const acceptRejectOrders = async (id: number) => {
  let params = {
    agentId: id,
  };
  let url = `${ApiConstants.baseUrl}${ApiConstants.getAcceptRejectOrders}`;
  const res = await API({}, url, "GET", params);
  return res?.data;
};

const deleteAgent = async (payload: any) => {
  const { agentId, isDeleted } = payload;
  let url = `${ApiConstants.baseUrl}${ApiConstants.deleteAgent}?agentId=${agentId}&isDeleted=${isDeleted}`;
  const res = await API({}, url, "PUT");
  return res?.data;
};


const getTopPerfomingAgent = async () => {
  let url = `${ApiConstants.baseUrl}${ApiConstants.getTopPerformingAgents}`;
  const res = await API({}, url, "GET");
  let count = 1;
  let formattedList = res.data?.data?.map((item: any) => {
    return { ...item, key: count++ };
  });
  let dataFetched = {
    statusCode: res?.data?.statusCode,
    data: formattedList,
  };
  return dataFetched;
};

const getTotalAgentAndDelivery= async () => {
  let url = `${ApiConstants.baseUrl}${ApiConstants.getAgentAndDeliveryCounts}`;
  const res = await API({}, url, "GET");
  return res?.data;
};
const AgentService = {
  getAllAgents,
  getAgentDetails,
  getAvailableAgents,
  assignAgentManually,
  assignAgentAutomatically,
  getFeedbackDetails,
  verifyAgentKyc,
  getVerificationStatus,
  acceptRejectOrders,
  deleteAgent,
  getTopPerfomingAgent,
  getTotalAgentAndDelivery
};

export default AgentService;
