export const ApiConstants = {
     baseUrl: process.env.REACT_APP_API_BASE_URL_DELIVERY_AGENT,
     orderProcessingbaseUrl:  process.env.REACT_APP_API_BASE_URL_ORDER_PROCESS,
     feedbackBaseUrl:  process.env.REACT_APP_API_BASE_URL_FEEDBACK,
     // API Response Codes
     successCode: 200,
     successEndRange: 299,
     errorCode: 503,
     badRequest: 400,
     unAuthorizedCode: 401,
     forbidden: 403,
     internalServerError: 500,
     notFound: 404,
  
     //Local Storage Constants
     user: "user",
     // API Endpoints Constants
     loginEndpoint:  'testing/login',
     // Agents Endpoints
     verifyAgentKyc:'working-location/VerifyAgentKycDocuments',
     getVerificationStatus:'working-location/getVerificationStatus',
     getAgentList: 'personal-details/getAgentsList',
     getAgentDetail:'personal-details/getDetails',
     deleteAgent:'personal-details/markAgentAsInactive',
     assignAgentAutomatically: 'assignAgent/automatically-assign-preview',
     getAssignedAgent:'agent/GetAll',
     modifyAgentStatus:'business-admin',
     assignAgentManual:'assignAgent/assign-manually',
     //Orders Processing endpoint
     getOrders:'business/getOrdersByStoresId',
     getAvailableOrders: 'business/getOrdersByStoresIdAndStatus',
     getOrderDetailsById:'business/getOrderDetailsByOrderId',
     getAssignedOrders: 'order/assigned-orders',
     getCompletedOrders: 'order/completed-orders',
     updateOrder:'order/updateOrder',
     getOrderTimeLine:'order/getOrderTimeline',
     //feedback endpoints
     getAgentFeedback:'feedback/deliveryAgentFeedback/',
     //Image Service
     uploadImage: 'images/upload',
     // Count Apis
     getAcceptRejectOrders:'assignAgent/CountDeliveredOrRejectedOrders',
     //Timeslots By Id
     getTimeSlots:'TimeSlot/getBySlotIds'
}