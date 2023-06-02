
const dummyData = {
  data:[
    {
      key: "1",
      deliveryAgentId:"23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0
    },
    {
      key: "2",
      deliveryAgentId:"23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0
    },
    {
      key: "3",
      deliveryAgentId:"23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0
    },
    {
      key: "4",
      deliveryAgentId:"23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0
    },
    {
      key: "5",
      deliveryAgentId:"23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0
    },
    {
      key: "6",
      deliveryAgentId:"23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0
    },
    {
      key: "7",
      deliveryAgentId:"23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0
    },
    {
      key: "8",
      deliveryAgentId:"23",
      deliveryAgentName: "Rajesh Kumar",
      deliveryAgentAddress: "Noida sector 59 Metro Station",
      agentStatus: 1,
      verStatus: 0
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
      payment_type: "Credit Card",
      delivery_address:"Sector 59 Noida",
      amount: 2000,
      loading:false,
    },
    {
      key: "2",
      order_id:"24",
      payment_type: "ONLINE",
      delivery_address:"Dwarika Sector 21, Delhi",
      amount: 67000,
      loading:false
    },
    {
      key: "3",
      order_id:"25",
      payment_type: "COD",
      delivery_address:"Sector 62 Noida",
      amount: 5000,
      loading:false
    },
    {
      key: "4",
      order_id:"26",
      payment_type: "COD",
      delivery_address:"Sector 59 Noida",
      amount: 1000,
      loading:false
    },
    {
      key: "5",
      order_id:"26",
      payment_type: "COD",
      delivery_address:"Sector 59 Noida",
      amount: 2000,
      loading:false
    },
    {
      key: "6",
      order_id:"26",
      payment_type: "COD",
      delivery_address:"Sector 59 Noida",
      amount: 1000,
      loading:false
    },
  ],
  assignedOrderData: [
    {
      key: "1",
      storename:"23",
      order_id:'23',
      payment_type: "UPI",
      assigned_agent:"Ram Manohar",
    
    },
    {
      key: "2",
      order_id:"93",
      payment_type: "Online Banking",
      assigned_agent:"Ram Manohar",
    
    },
    {
      key: "3",
      order_id:"99",
      payment_type: "Credit Card",
      assigned_agent:"Ram Manohar",
    
    },
    {
      key: "4",
      order_id:"03",
      payment_type: "COD",
      assigned_agent:"Ram Manohar",
    },
  ],
  completedOrderData: [
    {
      key: "1",
      storename:"23",
      status:"Delivered",
      order_id:'23',
      payment_type: "UPI",
      assigned_agent:"Ram Manohar",
    
    },
    {
      key: "2",
      order_id:"93",
      status:"Delivered",
      payment_type: "Online Banking",
      assigned_agent:"Ram Manohar",
    
    },
    {
      key: "3",
      order_id:"99",
      status:"Delivered",
      payment_type: "Credit Card",
      assigned_agent:"Ram Manohar",
    
    },
    {
      key: "4",
      order_id:"03",
      status:"Delivered",
      payment_type: "COD",
      assigned_agent:"Ram Manohar",
    },
  ],
  assignedAgents:[
       
        {
          key: "1",
          serialNo:'1',
          storename:"Momos King",
          deliveryAgentName:"Ram Manohar",
          orderStatus:"Deliverd"
        
        },
        {
          key: "2",
           serialNo:'2',
          storename:"Momos King",
          deliveryAgentName:"Mukesh",
          orderStatus:"Not Pickuped"
        
        },
        {
          key: "3",
           serialNo:'3',
          storename:"Momos King",
          deliveryAgentName:"Deepak Chaurasiya",
          orderStatus: 'Ongoing'
        },
        {
          key: "4",
          serialNo:'3',
          storename:"Terence Cafe",
          deliveryAgentName:"Deepak Chaurasiya",
          orderStatus: 'Ongoing'
        },
        {
          key: "5",
           serialNo:'2',
          storename:"Momos King",
          deliveryAgentName:"Mukesh",
          orderStatus:"Not Pickuped"
        
        },
  ]
}


export default  dummyData;

 