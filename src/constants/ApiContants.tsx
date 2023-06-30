export const ApiContants = {
     baseUrl: process.env.REACT_APP_API_BASE_URL_DELIVERY_AGENT,
     orderProcessingbaseUrl:  process.env.REACT_APP_API_BASE_URL_ORDER_PROCESS,
     feedbackbaseUrl:  process.env.REACT_APP_API_BASE_URL_FEEDBACK,
     // API Response Codes
     successCode: 200,
     successEndRange: 299,
     errorCode: 900,
     badRequest: 400,
     unAuthorizedCode: 401,
     forbidden: 403,
     internalServerError: 500,
     notFound: 404,
  
     //Local Storage Constants
     user: "user",
     // API Endpints Constants
     loginEndpoint:  'testing/login',

     // Agents Endpoints
     getAgentList: '/business-admin/get-agents',
     assignAgentAutomatically: 'agent/assign-agent',
     assignOrderInBulk:'agent/assign-agent-bulk',
     getAssignedAgent:'agent/GetAll',
     modifyAgentStatus:'business-admin',
     assignAgentManual:'agent/assign-manually',
     assignAgentBulkAutomatic:'agent/assign-agent-bulk',
     assignAgentManualBulk:'agent/bulk-assign-manually',
     //Orders Processing endpoint
     getOrders:'business/getOrdersByStoresId',
     getAvailableOrders: 'business/getOrdersByStoresIdAndStatus',
     getOrderDetailsById:'business/getOrderDetailsByOrderId',
     getAssinedOrders: 'order/assigned-orders',
     getCompletedOrders: 'order/completed-orders',
     updateOrder:'order/updateOrder',
     //feedback endpoints
     getAgentFeedback:'feedback/deliveryAgentFeedback/'
}