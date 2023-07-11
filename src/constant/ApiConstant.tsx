export const ApiConstant = {
    baseUrl : 'https://app-deliveryagent-dev.azurewebsites.net/api/v1/',
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
    loginEndpoint:  'testing/login',
    // Agents EndPoints
    agentDetails: 'agentDetail',
    verifyAgent:'businessAdmin/verify-new-agent-request',
    
    // Address Api EndPoints
    addNewWorkingLocationEndpoint:'working-location',
    personalDetailendpoint:'personal-details/get',
    addpersonalDetailendpoint:'personal-details/add',
    updatepersonalDetailendpoint:'personal-details/update',
    kycDetailendpoint:'KYC',
    addvechileDetailendpoint:'vehicle-details/add',
    getvechileDetailendpoint:'vehicle-details/get',
    updatevechileDetailendpoint:'vehicle-details/update',
    bankdetailEndpoint:'BankDetails',


  };