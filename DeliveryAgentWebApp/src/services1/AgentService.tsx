import API from "./ApiService";
import { ApiContants } from "../constants/ApiContants";

/**
 *
 * @param pagination
 * @returns List of All Agents
 */
const getAllAgents = async (pagination: any) => {
  const { pageNumber, limit } = pagination;
  let url = `${ApiContants.getAgentList}?pageNumber=${pageNumber}&limit=${limit}`;
  const res = await API({}, url, "GET");
  return res?.data;
};

/**
 * @param pagination
 * @returns List of All Assigned Agents
 */

const getAssinedAgents = async (pagination: any) => {
  const { pageNumber, limit } = pagination;
  let url = `${ApiContants.getAssignedAgent}?pageNumber=${pageNumber}&limit=${limit}`;
  const res = await API({}, url, "GET");
  return res?.data;
};

/**
 * @param payload Object which contain OrderId and BusinessId
 * @returns response message
 */
const assignAgentToOrder = async (payload: any) => {
  let url = `${ApiContants.assignOrder}`;
  const res = await API(payload, url, "POST");
  return res?.data;
};

/**
 * @param payload Array of Object which contain OrderId and BusinessId
 * @returns response message
 */
const assignAgentToOrderInBulk = async (payload: any) => {
  let url = `${ApiContants.assignOrderInBulk}`;
  const res = await API(payload, url, "POST");
  return res?.data;
};

const AgentService = {
  getAllAgents,
  getAssinedAgents,
  assignAgentToOrder,
  assignAgentToOrderInBulk,
};

export default AgentService;
