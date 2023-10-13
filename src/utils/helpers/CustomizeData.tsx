import {
  automaticAssignAgentInterface,
  manualAssignAgentInterface,
  updateOrders,
} from "../types";

function getRandomNumber() {
  return Math.floor(Math.random() * 5); // Generates a random number between 0 and 3
}
const AvilableOrderData = (data: any) => {
  let pickupLatitudes = [28.615568, 28.459259, 28.615568, 28.459259, 28.459259];
  let pickupLongitudes = [
    77.371631, 77.072248, 77.371631, 77.079652, 77.079652,
  ];
  let deliveryAddressLatitudes = [
    28.611819, 28.620813, 28.591518, 28.464267, 28.469939,
  ];
  let deliveryAddressLongitudes = [
    77.36116, 77.383164, 77.318553, 77.079652, 77.075584,
  ];
  let storeName = [
    "C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301",
    "GRMI, Plot 88, Sector 44, Near HUDA Metro Station, Gurugram, Haryana 122002",
    "Hosiyaar Puri",
    "Masala Club",
    "Burger King",
  ];
  let addresses = [
    "C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh 201309",
    "D-111, BASEMENT, Sector 63, Noida, Uttar Pradesh 201301",
    "H. No. -286, First floor, sector-15A, Noida, Uttar Pradesh 201301",
    "Ashok Rd, Block B, Sector 43, Gurugram, Haryana 122009",
    "Laburnum Dr, Block A, Sushant Lok Phase I, Sector 28, Gurugram, Haryana",
  ];
  let newData = data?.map((item: any) => {
    let idxStore = getRandomNumber();
    let idxaddrss = getRandomNumber();
    return {
      ...item,
      storeDetails: {
        storname: storeName[idxStore],
        pickupLatitudes: pickupLatitudes[idxStore],
        pickupLongitudes: pickupLongitudes[idxStore],
      },
      shippingAddressDetails: {
        address: addresses[idxaddrss],
        deliveryAddressLatitudes: deliveryAddressLatitudes[idxaddrss],
        deliveryAddressLongitudes: deliveryAddressLongitudes[idxaddrss],
      },
      loading: false,
    };
  });
  return newData;
};

const getOrdersArray = (data: any, id: any) => {
  let manualPayload = Array<manualAssignAgentInterface>();
  data.forEach((item: any) => {
    let payload: manualAssignAgentInterface = {
      agentId: id,
      orderId: item?.id,
      vendorAddressId: item?.vendor?.business?.address_id,
      pickupLatitude: item?.vendor?.business?.address?.latitude,
      pickupLongitude: item?.vendor?.business?.address?.longitude,
      deliveryAddressId: item?.shippingAddress?.id,
      deliveryAddressLatitude: item?.shippingAddress?.latitude,
      deliveryAddressLongitude: item?.shippingAddress?.longitude,
      orderStatus: 5,
    };
    manualPayload.push(payload);
  });
  return manualPayload;
};

// Orders
const getOrdersArrayBulk = (data: any) => {
  let autoAssignPayload = Array<automaticAssignAgentInterface>();
  data.forEach((item: any) => {
    let payload: automaticAssignAgentInterface = {
      orderId: item?.id,
      vendorAddressId: item?.vendor?.business?.address_id,
      pickupLatitude: item?.vendor?.business?.address?.latitude,
      pickupLongitude: item?.vendor?.business?.address?.longitude,
      deliveryAddressId: item?.shippingAddress?.id,
      deliveryAddressLatitude: item?.shippingAddress?.latitude,
      deliveryAddressLongitude: item?.shippingAddress?.longitude,
    };
    autoAssignPayload.push(payload);
  });
  return autoAssignPayload;
};

const getSingleOrderArray = (data: any) => {
  let singleautoAssignPayload = Array<automaticAssignAgentInterface>();
  let payload: automaticAssignAgentInterface = {
    orderId: data?.id,
    vendorAddressId: data?.vendor?.business?.address_id,
    pickupLatitude: data?.vendor?.business?.address?.latitude,
    pickupLongitude: data?.vendor?.business?.address?.longitude,
    deliveryAddressId: data?.shippingAddress?.id,
    deliveryAddressLatitude: data?.shippingAddress?.latitude,
    deliveryAddressLongitude: data?.shippingAddress?.longitude,
  };
  singleautoAssignPayload.push(payload);
  return singleautoAssignPayload;
};

const previewData = (data: any) => {
  let resData = Array<any>();
  let len = data.orders?.length;
  for (let i = 0; i < len; i++) {
    let obj = {
      agentId: data.agentId[i],
      orderId: data.orders[i],
      deliveryAgentName: data.agentName[i],
      deliveryAddress: "C Block, Phase 2, Industrial Area, Sector 62, Noida,",
    };
    resData.push(obj);
  }
  return resData;
};

const assignAgentAutoData = (previewData: any, orderData: any) => {
  let autoAssignPayload = Array<manualAssignAgentInterface>();
  orderData.forEach((item: any) => {
    let selectedAgent = previewData?.filter(
      (ele: any) => ele.orderId === item?.id
    );
    let payload: manualAssignAgentInterface = {
      agentId: selectedAgent[0]?.deliveryAgentId,
      orderId: item?.id,
      vendorAddressId: item?.vendor?.business?.address_id,
      pickupLatitude: item?.vendor?.business?.address?.latitude,
      pickupLongitude: item?.vendor?.business?.address?.longitude,
      deliveryAddressId: item?.shippingAddress?.id,
      deliveryAddressLatitude: item?.shippingAddress?.latitude,
      deliveryAddressLongitude: item?.shippingAddress?.longitude,
      orderStatus: item?.orderStatus,
    };
    autoAssignPayload.push(payload);
  });
  return autoAssignPayload;
};

const updateOrderStatusPayload = (data: any) => {
  let payload = Array<updateOrders>();
  data.forEach((item: any) => {
    let newPayload = {
      orderId: item?.orderId,
      deliveryAgentId: item?.agentId,
    };

    payload.push(newPayload);
  });
  const newPayload = {
    orderStatus: 5,
    orders: payload,
  };
  return newPayload;
};

const assignAgentAutoDataSingle = (previewData: any, orderData: any) => {
  console.log("pre", previewData);
  let payload = orderData?.map((item: any) => {
    return {
      ...item,
      deliveryAgentId: previewData[0]?.deliveryAgentId,
      orderStatus: 5,
    };
  });
  return payload;
};
export default {
  AvilableOrderData,
  getOrdersArray,
  previewData,
  assignAgentAutoData,
  getOrdersArrayBulk,
  getSingleOrderArray,
  assignAgentAutoDataSingle,
  updateOrderStatusPayload,
};
