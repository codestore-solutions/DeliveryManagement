import API from "./ApiService";
import { ApiContants } from '../constants/ApiContants';

/**
 *
 * @param pagination
 * @returns List of All Agents
 */
const getAllAgents = async (pagination: any) => {
  let id = 2;
  const { pageNumber, pageSize } = pagination;
  let params = {
    pageNumber: pageNumber,
    limit: pageSize,
  };
  let url = `${ApiContants.baseUrl}${ApiContants.getAgentList}/${id}`;
  const res = await API({}, url, "GET", params);
  let count = 1;
  let fromattedList =  res?.data?.data?.map((item:any) =>{
        return {...item, key: count++}
  })
  
  return fromattedList;
};

/**
 * @param pagination
 * @returns List of All Assigned Agents
 */

const getAvialableAgents = async (pagination: any) => {
  let id = 2;
  const { pageNumber, pageSize } = pagination;
  let params = {
    pageNumber: pageNumber,
    limit: pageSize,
    agentStatus:1,
  };
  let url = `${ApiContants.baseUrl}${ApiContants.getAgentList}/${id}`;
  const res = await API({}, url, "GET", params);
  console.log("Res", res.data?.data);
  let count = 1;
  let fromattedList =  res?.data?.data?.map((item:any) =>{
        return {...item, key: count++}
  })
  
  return fromattedList;
};

/**
 * @param payload Object which contain OrderId and BusinessId
 * @returns response message
 */
const assignAgentManuallyToOrder = async (payload: any) => {
  let url = `${ApiContants.baseUrl}${ApiContants.assignAgentManual}`;
  const res = await API(payload, url, "POST");
  return res;
};


/**
 * @param payload Object which contain OrderId and BusinessId
 * @returns response message
 */
const assignAgentManuallyToOrderInBulk = async (payload: any) => {
  let url = `${ApiContants.baseUrl}${ApiContants.assignAgentManualBulk}`;
  const res = await API(payload, url, "POST");
  return res?.data;
};


const assignAgentAutomaticallyToOrder = async (payload: any) => {
  let url = `${ApiContants.baseUrl}${ApiContants.assignAgentAutomatically}`;
  const res = await API(payload, url, "POST");
  return res?.data;
};


/**
 * @param payload Object which contain array of OrderId, pickup cordinate, delivery cordinates and BusinessId
 * @returns response message
 */
// const assignAgentManuallyToBulkOrder = async (payload: any) => {
//   let url = `${ApiContants.baseUrl}${ApiContants.assignAgentManual}`;
//   const res = await API(payload, url, "POST");
//   return res;
// };


/**
 * @param payload Array of Object which contain OrderId and BusinessId
 * @returns response message
 */
const assignAgentToOrderInBulkAutomatically = async (payload: any) => {
  let url = `${ApiContants.baseUrl}${ApiContants.assignAgentBulkAutomatic}`;
  const res = await API(payload, url, "POST");
  console.log("res", res);
  return res?.data;
};


const getAddressDetails = async (id:any) =>{
    let param = {
      shippingAddressId: id
    }
    let url = `https://app-orderbooking-dev.azurewebsites.net/api/v1/address/get-address`;
    const res = await API({}, url, "GET", param);
    return res?.data;
}

const AgentService = {
  getAllAgents,
  getAvialableAgents,
  assignAgentManuallyToOrder,
  assignAgentToOrderInBulkAutomatically,
  getAddressDetails,
  assignAgentAutomaticallyToOrder,
  assignAgentManuallyToOrderInBulk
};

export default AgentService;
