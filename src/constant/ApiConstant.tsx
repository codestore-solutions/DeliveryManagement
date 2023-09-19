export const ApiConstant = {
    baseUrl : 'https://app-deliveryagent-dev.azurewebsites.net/api/v1/',
    orderUrl: 'https://order-processing-dev.azurewebsites.net/api/',
    //API response codes
    successCode: 200,
    successEndRange: 299,
    errorCode: 900,
    badRequest: 400,
    unAuthorizedCode: 401,
    forbidden: 403,
    internalServerError: 500,
    notFound: 404,
    
    //Authentication endpoint
    loginEndpoint:  'testing/login',
    // Agents EndPoints
    agentDetails: 'agentDetail',
    verifyAgent:'businessAdmin/verify-new-agent-request',
    agentProfileStatus: 'personal-details/getProfileCompletedStatus',
    updateProfileStatus:'personal-details/updateProfileCompletedStatus',
    // Address Api EndPoints
    changeWorkingLocation:'working-location/updateActiveStatus',
    addNewWorkingLocationEndpoint:'working-location',
    updateWorkingLocationEndpoint:'working-location',
    getAgentStatus:'working-location/getAvailabilityStatus',
    updateAgentStatus:'working-location/updateAgentStatus',
    // Agent Onboarding Api Endpoints
    personalDetailendpoint:'personal-details/get',
    addpersonalDetailendpoint:'personal-details/add',
    updatepersonalDetailendpoint:'personal-details/update',
    kycDetailendpoint:'KYC',
    addvehicleDetailendpoint:'vehicle-details/add',
    getVehicleDetailEndPoint:'vehicle-details/get',
    updatevechileDetailendpoint:'vehicle-details/update',
    getbankdetailEndpoint:'bank-details/get',
    addbankdetailEndpoint:'bank-details/add',
    updatebankdetailEndpoint:'bank-details/update',
     // Orders Request Endpoints
    getOrderRequest:'delivery/getOrdersByDeliveryAgentId',
    acceptAndRejectOrderRequest:'assignAgent/acceptOrReject',
    pickupAndDelivery: 'assignAgent/updatePickupOrDeliveryStatus',
    getOrderTimeLine:'order/getOrderTimeline',
    getOrderDetailsById:'business/getOrderDetailsByOrderId',
    // Upload Service
    uploadImage:'images/upload',
    //Time Slots
    getTimeSlots:'TimeSlot/getAllTimeSlots',
    getActiveTimeSlots:'TimeSlot/getAllActiveTimeSlots',
    updateTimeSlots:'TimeSlot/updateSlotsStatus',
    getAgentAndDeliveryCounts:'assignAgent/CountDeliveredOrRejectedOrders',
    getTimeSlotsWithIds:'TimeSlot/getBySlotIds',
    
  };