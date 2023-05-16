
const dummyData = {
  data:[
    {
      key: "1",
      agent_id:"23",
      name: "Rajesh Kumar",
      age: 32,
      address: "Noida Sector 59 Metro Station",
      status: ["NotVerified"],
      availibility:['YES']
    },
    {
      key: "2",
      agent_id:"25",
      name: "Raju Garg",
      age: 42,
      address: "Dwarika Sector 21, Delhi",
      status: ["Pending"],
      availibility:['NO']
    },
    {
      key: "3",
      agent_id:"12",
      name: "Deepak Jain",
      age: 32,
      address: "Lucknow, GomtiNagar(UP)",
      status: ["Verified"],
      availibility:['YES']
    },
    {
      key: "4",
      agent_id:"03",
      name: "Deepak Jain",
      age: 32,
      address: "Lucknow, GomtiNagar(UP)",
      status: ["Verified"],
      availibility:['YES']
    },
    {
      key: "5",
      agent_id:"93",
      name: "Raju Garg",
      age: 42,
      address: "Dwarika Sector 21",
      status: ["Pending"],
      availibility:['YES']
    },
    {
      key: "6",
      agent_id:"55",
      name: "Deepak Jain",
      age: 32,
      address: "Lucknow, GomtiNagar(UP)",
      status: ["Verified"],
      availibility:['NO']
    },
    {
      key: "7",
      agent_id:"42",
      name: "Raju Garg",
      age: 42,
      address: "Dwarika Sector 21",
      status: ["Pending"],
      availibility:['YES']
    },
    {
      key: "8",
      agent_id:"31",
      name: "Deepak Jain",
      age: 32,
      address: "Lucknow, GomtiNagar(UP)",
      status: ["Verified"],
      availibility:['YES']
    },
  ],
  selectOptions : [
    { value: "#124", label: "#124" },
    { value: "1255", label: "#124" },
    { value: "1276", label: "126" },
    { value: "127", label: "123" },
    { value: "1223", label: "124" },
  ],
  availableOrderData: [
    {
      key: "1",
      order_id:"23",
      payment_status: "Conformed",
      delivery_address:"Sector 59 Noida",
      amount: 2000
    },
    {
      key: "2",
      order_id:"24",
      payment_status: "Conformed",
      delivery_address:"Dwarika Sector 21, Delhi",
      amount: 67000
    },
    {
      key: "3",
      order_id:"25",
      payment_status: "Conformed",
      delivery_address:"Sector 62 Noida",
      amount: 5000
    },
    {
      key: "4",
      order_id:"26",
      payment_status: "Conformed",
      delivery_address:"Sector 59 Noida",
      amount: 1000
    },
  ],
  assignedOrderData: [
    {
      key: "1",
      order_id:"23",
      payment_status: "Conformed",
      assigned_agent:"Ram Manohar",
    
    },
    {
      key: "2",
      order_id:"93",
      payment_status: "Conformed",
      assigned_agent:"Ram Manohar",
    
    },
    {
      key: "3",
      order_id:"99",
      payment_status: "Conformed",
      assigned_agent:"Ram Manohar",
    
    },
    {
      key: "4",
      order_id:"03",
      payment_status: "Conformed",
      assigned_agent:"Ram Manohar",
    
    },
  ]
}


export default  dummyData;

 