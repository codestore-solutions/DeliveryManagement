export const ApiContants = {
     baseUrl: 'https://app-deliveryagent-dev.azurewebsites.net/api/v1/',

     // API Response Codes
     successCode: 200,
     successEndRange: 299,
     errorCode: 900,
     badRequest: 400,
     unAuthorizedCode: 401,
     forbidden: 403,
     internalServerError: 500,
     notFound: 404,

     // API Endpints Constants
     loginEndpoint:  'login',
     signupEndpoint:  'signup',

     // Agents Endpoints
     getAgentList: 'business-admin/get-agents',
     assignOrder: 'agent/assign-agent',
     assignOrderInBulk:'agent/assign-agent-bulk',
     getAssignedAgent:'agent/GetAll',
     modifyAgentStatus:'business-admin',
     //Orders endpoint
     getOrders:'order/availableOrderList',
     getAvailableOrders: 'order/available-orders',
     getAssinedOrders: 'order/assigned-orders',
     getCompletedOrders: 'order/completed-orders',
}