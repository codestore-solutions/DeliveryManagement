export const ApiConstant = {
    baseUrl : 'https://app-deliveragent-dev.azurewebsites.net/api/',
    //API response codes
    successCode: 200,
    successEndRange: 299,
    errorCode: 900,
    badRequest: 400,
    unAuthorizedCode: 401,
    forbidden: 403,
    internalServerError: 500,
    notFound: 404,
    
    //Authentiction endpoint
    loginEndpoint:  'login',
    signupEndpoint:  'signup',
    
   // Agents EndPoints
   verifyAgent:'businessAdmin/verify-new-agent-request',
  

  };