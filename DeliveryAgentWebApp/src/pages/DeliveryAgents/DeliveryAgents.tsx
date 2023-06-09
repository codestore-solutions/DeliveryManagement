import { Select, SelectProps, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
// import dummyData from "../../../dummyData";
import { useEffect, useState } from "react";
import AgentServices from "../../services/AgentServices";
import { CustomTable } from "../../components";
import { DetailsIcon } from "../../assets";
import { Link, useNavigate } from "react-router-dom";

export interface DataType {
  key: React.Key;
  deliveryAgentId: string;
  deliveryAgentName: string;
  deliveryAgentAddress: string;
  agentStatus: number;
  verStatus: number;
}

const options: SelectProps["options"] = [
  {
    value: "0",
    label: "Not Available",
  },
  {
    value: "1",
    label: "Available",
  },
];
// const pageSizeOptions = ["6", "14", "21", "28"];
const statusFilters = [
  { text: "Verified", value: 1 },
  { text: "NotVerified", value: 0 },
  { text: "Pending", value: 2 },
];
const availibilityFilters = [
  { text: "Available", value: 1 },
  { text: "Not Available", value: 0 },
  
];
// const addressFilters = [
//   {
//     text: "Delhi",
//     value: "Delhi",
//   },
//   {
//     text: "Lucknow",
//     value: "Lucknow",
//   },
//   {
//     text: "Noida Sector 59",
//     value: "Noida Sector 59",
//   },
// ];
const DeliveryAgents: React.FC = () => {
  const navigate = useNavigate();
  const [agentsList, setAgentsList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    total: 8,
    pageSize: 6,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });

  const handleClick = (state: any) => {
    navigate(`/dashboard/agent-details/${state.deliveryAgentId}`, { state });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Sr No.",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Agent Name",
      dataIndex: "deliveryAgentName",
      key: "deliveryAgentName",
      render: (text) => <p className="tableTxt">{text}</p>,
    },

    {
      title: "Address",
      dataIndex: "deliveryAgentAddress",
      key: "deliveryAgentAddress",

      render: (text) => <p className="tableTxt">{text}</p>,
     
    },
    {
      title: "Availibility",
      key: "agentStatus",
      dataIndex: "agentStatus",
      filters:availibilityFilters,
      render: (_, { agentStatus }) => (
        <>
          <span>
            {" "}
            {agentStatus === 1 ? (
              <p className="tableTxtAv">Available</p>
            ) : (
              <p className="tableTxtNot">Not Available</p>
            )}{" "}
          </span>
        </>
      ),
      onFilter: (value: any, record: any) =>
      record.agentStatus === value,
    },
    {
      title: "Status",
      key: "verStatus",
      dataIndex: "verStatus",
       filters: statusFilters,
      render: (_, { verStatus }) => (
        <>
          <span>
            {verStatus === 1 ? (
              <p className="verified">Verified</p>
            ) :  verStatus=== 2 ? (

              <p className="codStatus">Pending</p>
            ) :   <p className="codStatus">Not Verified</p>}{" "}
          </span>
        </>
      ),
      onFilter: (value: any, record: any) =>
      record.verStatus === value,
     
    },
    {
      title: "Details",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle" onClick={() => handleClick(record)}>
          <img src={DetailsIcon} alt="" />
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log("Page", filters, );
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
    getAgents(filters.verStatus[0]);
  };


  const getAgents = (status?:any) => {
    let instance = AgentServices.getInstance();
    setLoading(true);
    let count = 1;
    instance
      .getAgentsList(pagination.pageNumber, pagination.pageSize, status)
      .then((res) => {
        const formattedData = res?.map((item: any) => ({
          ...item,
          key: uuidv4(),
          serialNo: count++,
        }));
        setAgentsList(formattedData);
        setLoading(false);
      });
    // console.log("datal", agentsList);
  };

  const handleChange = (values: any) =>{};

  useEffect(() => {
    getAgents(2);
  }, [pagination.pageNumber]);

  return (
    <div id="delivery-agent">
      {/* <h3 className="heading">Agents List</h3>
      <div className="filter">
      <span>Sort: </span>
          <Select
            size={"large"}
            defaultValue={"Select"}
            onChange={handleChange}
            options={options}
            style={{ width: "30vw" }}
          />
      </div> */}
      <CustomTable
        columns={columns}
        data={agentsList}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default DeliveryAgents;
