export const ApiContants = {
     baseUrl: 'https://app-deliveragent-dev.azurewebsites.net/api/',

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
     getAgentList: 'businessAdmin/GetAllAgentList',
     assignOrder: 'orderAssign',
     assignOrderInBulk:'orderAssign/assignOrderInBulk',
     
     //Orders endpoint
     getOrders: 'order'
}