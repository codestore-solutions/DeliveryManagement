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
     getAgentList: 'personal-details/getAgentsList',
     getAgentDteails:'personal-details/getDetails',
     assignAgentAutomatically: 'assignAgent/automatically-assign-preview',
     getAssignedAgent:'agent/GetAll',
     modifyAgentStatus:'business-admin',
     assignAgentManual:'assignAgent/assign-manually',
     //Orders Processing endpoint
     getOrders:'business/getOrdersByStoresId',
     getAvailableOrders: 'business/getOrdersByStoresIdAndStatus',
     getOrderDetailsById:'business/getOrderDetailsByOrderId',
     getAssinedOrders: 'order/assigned-orders',
     getCompletedOrders: 'order/completed-orders',
     updateOrder:'order/updateOrder',
     getOrderTimeLine:'order/getOrderTimeline',
     //feedback endpoints
     getAgentFeedback:'feedback/deliveryAgentFeedback/'
}