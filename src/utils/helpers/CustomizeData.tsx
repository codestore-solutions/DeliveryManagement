

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
    console.log("Order Dtaa", newData);
  return newData;
};

const getOrdersArray = (data: any, id:any) => {
  let Orderids = Array<number>();
  let pickupLatitudes = Array<number>();
  let pickupLongitudes = Array<number>();
  let deliveryAddressLatitudes = Array<number>();
  let deliveryAddressLongitude = Array<number>();
  let deliveryAgentId = Array<number>();
  data.forEach((item: any) => {
    deliveryAgentId.push(id);
    Orderids.push(item.id);
    pickupLatitudes.push(item.storeDetails?.pickupLatitudes);
    pickupLongitudes.push(item.storeDetails?.pickupLongitudes);
    deliveryAddressLatitudes.push(
      item?.shippingAddressDetails?.deliveryAddressLatitudes
    );
    deliveryAddressLongitude.push(
      item?.shippingAddressDetails?.deliveryAddressLongitudes
    );
  });
  let finalResult = Array<Array<any>>([
    deliveryAgentId,
    Orderids,
    pickupLatitudes,
    pickupLongitudes,
    deliveryAddressLatitudes,
    deliveryAddressLongitude,
  ]);

  console.log("OrdersIds", finalResult);
  return finalResult;
};

// Orders
const getOrdersArrayBulk = (data: any) => {
  let Orderids = Array<number>();
  let pickupLatitudes = Array<number>();
  let pickupLongitudes = Array<number>();
  let deliveryAddressLatitudes = Array<number>();
  let deliveryAddressLongitude = Array<number>();
  data.forEach((item: any) => {
    Orderids.push(item.id);
    pickupLatitudes.push(item.storeDetails?.pickupLatitudes);
    pickupLongitudes.push(item.storeDetails?.pickupLongitudes);
    deliveryAddressLatitudes.push(
      item?.shippingAddressDetails?.deliveryAddressLatitudes
    );
    deliveryAddressLongitude.push(
      item?.shippingAddressDetails?.deliveryAddressLongitudes
    );
  });
  let finalResult = Array<Array<any>>([
    Orderids,
    pickupLatitudes,
    pickupLongitudes,
    deliveryAddressLatitudes,
    deliveryAddressLongitude,
  ]);

  console.log("OrdersIds", finalResult);
  return finalResult;
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
  let deliveryAgentId = Array<any>();
  let orderIds = Array<any>();
  let pickupLatitudes = Array<any>();
  let pickupLongitudes = Array<any>();
  let deliveryAddressLatitudes = Array<any>();
  let deliveryAddressLongitudes = Array<any>();

  previewData.forEach((ele: any) => {
    deliveryAgentId.push(ele.agentId);
    orderIds.push(ele.orderId);
  });

  orderIds.forEach((ele) => {
    let order = orderData.find((item: any) => item.id === ele);
    pickupLatitudes.push(order?.storeDetails?.pickupLatitudes);
    pickupLongitudes.push(order?.storeDetails?.pickupLongitudes);
    deliveryAddressLatitudes.push(
      order?.shippingAddressDetails?.deliveryAddressLatitudes
    );
    deliveryAddressLongitudes.push(
      order?.shippingAddressDetails?.deliveryAddressLongitudes
    );
  });

  let finalResult = {
    deliveryAgentId: deliveryAgentId,
    orderIds: orderIds,
    pickupLatitudes: pickupLatitudes,
    pickupLongitudes: pickupLongitudes,
    deliveryAddressLatitudes: deliveryAddressLatitudes,
    deliveryAddressLongitudes: deliveryAddressLongitudes,
    businessId: 2,
  };

  // console.log("Finnal Assign Payload", finalResult);
  return finalResult;
};
export default {
  AvilableOrderData,
  getOrdersArray,
  previewData,
  assignAgentAutoData,
  getOrdersArrayBulk
};
