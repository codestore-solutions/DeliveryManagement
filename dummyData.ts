const dummyData = {
  data: [
    {
      key: "1",
      deliveryAgentId: "23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0,
    },
    {
      key: "2",
      deliveryAgentId: "23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0,
    },
    {
      key: "3",
      deliveryAgentId: "23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0,
    },
    {
      key: "4",
      deliveryAgentId: "23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0,
    },
    {
      key: "5",
      deliveryAgentId: "23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0,
    },
    {
      key: "6",
      deliveryAgentId: "23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0,
    },
    {
      key: "7",
      deliveryAgentId: "23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0,
    },
    {
      key: "8",
      deliveryAgentId: "23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0,
    },
  ],
  selectOptions: [
    { value: "#124", label: "#124" },
    { value: "1255", label: "#124" },
    { value: "1276", label: "126" },
    { value: "127", label: "123" },
    { value: "1223", label: "124" },
  ],
  availableOrderData: [
    {
      key: "1",
      orderId: "23",
      storename: "Burger King",
      payment_type: 0,
      shippingAddress: "Sector 59 Noida",
      date: "10/02/2023",
    },
    {
      key: "2",
      orderId: "24",
      storename: "Terece Cafe",
      payment_type: 1,
      shippingAddress: "Sector 59 Noida",
      date: "10/02/2023",
    },
    {
      key: "3",
      orderId: "25",
      storename: "Momos King",
      payment_type: 2,
      shippingAddress: "Sector 59 Noida",
      date: "10/02/2023",
    },
    {
      key: "4",
      orderId: "26",
      storename: "Momos King",
      payment_type: 2,
      shippingAddress: "Sector 59 Noida",
      date: "10/02/2023",
    },
    {
      key: "5",
      orderId: "26",
      storename: "Momos King",
      payment_type: 1,
      shippingAddress: "Sector 59 Noida",
      date: "10/02/2023",
    },
    {
      key: "6",
      orderId: "26",
      storename: "Masala Club",
      payment_type: 2,
      shippingAddress: "Sector 59 Noida",
      date: "10/02/2023",
    },
  ],
  assignedOrderData: [
    {
      key: "1",
      orderId: "26",
      status: "PickedUp",
      storename: "Masala Club",
      payment_type: 2,
      date: "30-05-2023",
      assigned_agent: "Ram Manohar",
    },
    {
      key: "2",
      date: "30-05-2023",
      orderId: "26",
      status: "Assigned",
      storename: "Momos King",
      payment_type: 1,
      assigned_agent: "Ram Manohar",
    },
    {
      key: "3",
      date: "30-05-2023",
      orderId: "26",
      status: "Assigned",
      storename: "Momos King",
      payment_type: 1,
      assigned_agent: "Ram Manohar",
    },
    {
      key: "4",
      date: "30-05-2023",
      orderId: "26",
      status: "PickedUp",
      storename: "Momos King",
      payment_type: 1,
      assigned_agent: "Ram Manohar",
    },
  ],
  completedOrderData: [
    {
      key: "1",
      storename: "23",
      status: "Delivered",
      date: "30-05-2023",
      orderId: "26",
      payment_type: 1,
      assigned_agent: "Ram Manohar",
    },
    {
      key: "2",
      date: "30-05-2023",
      status: "Delivered",
      orderId: "26",
      storename: "Momos King",
      payment_type: 1,
      assigned_agent: "Ram Manohar",
    },
    {
      key: "3",
      date: "30-05-2023",
      status: "Delivered",
      orderId: "26",
      storename: "Momos King",
      payment_type: 1,
      assigned_agent: "Ram Manohar",
    },
    {
      key: "4",
      date: "30-05-2023",
      status: "Delivered",
      orderId: "26",
      storename: "Momos King",
      payment_type: 1,
      assigned_agent: "Ram Manohar",
    },
  ],
  assignedAgents: [
    {
      key: "1",
      date: "30-05-2023",
      serialNo: "1",
      storename: "Momos King",
      deliveryAgentName: "Ram Manohar",
      orderStatus: "Deliverd",
    },
    {
      key: "2",
      date: "30-05-2023",
      serialNo: "2",
      storename: "Momos King",
      deliveryAgentName: "Mukesh",
      orderStatus: "Not Pickuped",
    },
    {
      key: "3",
      date: "30-05-2023",
      serialNo: "3",
      storename: "Momos King",
      deliveryAgentName: "Deepak Chaurasiya",
      orderStatus: "Ongoing",
    },
    {
      key: "4",
      date: "30-05-2023",
      serialNo: "3",
      storename: "Terence Cafe",
      deliveryAgentName: "Deepak Chaurasiya",
      orderStatus: "Ongoing",
    },
    {
      key: "5",
      date: "30-05-2023",
      serialNo: "2",
      storename: "Momos King",
      deliveryAgentName: "Mukesh",
      orderStatus: "Not Pickuped",
    },
  ],
};

export const storesIds = ["5577cf1c-c23c-4f4f-a350-6f39ecd95ef3","2edd3841-c902-43c8-862d-5e98b599d9ce"];

export const stores = [

  {

      "id": '5577cf1c-c23c-4f4f-a350-6f39ecd95ef3',

      "sellerId": '3',

      "businessId": '2',

      "name": "Fashion Junction",

      "description": "A trendy fashion store offering a wide range of clothing and accessories.",

      "address": {

          "street": "1234 Fashion Avenue",

          "city": "New Delhi",

          "state": "Delhi",

          "country": "India",

          "pincode": "110001",

          "landmark": "Near Connaught Place"

      }

  },

  {

      "id": '2edd3841-c902-43c8-862d-5e98b599d9ce',

      "sellerId": '3',

      "businessId": '2',

      "name": "Tech Bazaar",

      "description": "An electronics store specializing in the latest tech gadgets and devices.",

      "address": {

          "street": "5678 Innovation Road",

          "city": "New Delhi",

          "state": "Delhi",

          "country": "India",

          "pincode": "110002",

          "landmark": "Near Karol Bagh Market"

      }

  },

  {

      "id": '3',

      "sellerId": '3',

      "businessId": '2',

      "name": "Book Haven",

      "description": "A bookstore with a vast collection of books across various genres.",

      "address": {

          "street": "789 Book Street",

          "city": "New Delhi",

          "state": "Delhi",

          "country": "India",

          "pincode": "110003",

          "landmark": "Near Daryaganj"

      }

  },

  {

      "id": '4',

      "sellerId": '1',

      "businessId":'3',

      "name": "Sports Zone",

      "description": "A sports store catering to a wide range of athletic equipment and gear.",

      "address": {

          "street": "4567 Sports Avenue",

          "city": "New Delhi",

          "state": "Delhi",

          "country": "India",

          "pincode": "110004",

          "landmark": "Near Jawaharlal Nehru Stadium"

      }

  }

]

export default dummyData;
