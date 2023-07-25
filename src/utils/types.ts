export interface pagination {
  showLessItems?: boolean;
  hideOnSinglePage?: boolean;
  simple?: boolean;
  pageNumber: number;
  total: number;
  pageSize: number;
  showTotal: any;
  nextIcon?: any;
  prevIcon?: any;
}

export interface manualAssignAgentInterface {
    deliveryAgentId: number;
    orderId: number;
    vendorAddressId: number;
    pickupLatitude: number;
    pickupLongitude: number;
    deliveryAddressId: number;
    deliveryAddressLatitude: number;
    deliveryAddressLongitude: number;
}
export interface automaticAssignAgentInterface{
   orderId: number;
   vendorAddressId: number;
   pickupLatitude: number;
   pickupLongitude: number;
   deliveryAddressId: number;
   deliveryAddressLatitude: number;
   deliveryAddressLongitude: number;
}

export interface previewDataInterface{
  deliveryAgentId: number,
  deliveryAgentName: string,
  orderId: number
}