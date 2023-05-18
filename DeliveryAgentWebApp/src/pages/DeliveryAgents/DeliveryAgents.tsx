import { Space, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppstoreOutlined, EyeOutlined } from "@ant-design/icons";
import "./style.scss";
// import dummyData from "../../../dummyData";
import { useEffect, useState } from "react";
import AgentServices from "../../services/AgentServices";
import { CustomTable } from "../../components";

export interface DataType {
  key: React.Key;
  deliveryAgentId: string;
  deliveryAgentName: string;
  deliveryAgentAddress: string;
  agentStatus: number;
  verStatus: number;
}
// const pageSizeOptions = ["6", "14", "21", "28"];
// const statusFilters = [
//   { text: "Verified", value: "Verified" },
//   { text: "NotVerified", value: "NotVerified" },
//   { text: "Pending", value: "Pending" },
// ];
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
  const [agentsList, setAgentsList] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    limit: 8,
    total: 0,
    pageSize: 5,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Agent ID",
      dataIndex: "deliveryAgentId",
      key: "deliveryAgentId",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Name",
      dataIndex: "deliveryAgentName",
      key: "deliveryAgentName",
      render: (text) => <p className="tableTxt">{text}</p>,
    },

    {
      title: "Address",
      dataIndex: "deliveryAgentAddress",
      key: "deliveryAgentAddress",
      // filters: addressFilters,
      render: (text) => <p className="tableTxt">{text}</p>,
      // onFilter: (value: any, record: any) =>
      //   record.address.toString().toLowerCase().startsWith(value.toLowerCase()),
      // filterSearch: true,
      // width: "40%",
    },
    {
      title: "Availibility",
      key: "agentStatus",
      dataIndex: "agentStatus",
      render: (_, { agentStatus }) => (
        <>
          <span>
            {" "}
            {agentStatus === 1 ? (
              <p className="tableTxt">Available</p>
            ) : (
              <p className="tableTxt">Not Available</p>
            )}{" "}
          </span>
        </>
      ),
    },
    {
      title: "Status",
      key: "verStatus",
      dataIndex: "verStatus",
      render: (_, { verStatus }) => (
        <>
          <span>
            {verStatus === 1 ? (
              <p className="tableTxt">Verified</p>
            ) : (
              <p className="tableTxt">Not Verified</p>
            )}{" "}
          </span>
        </>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: () => (
        <Space size="middle">
          <EyeOutlined style={{ color: "#545BFC" }} />
        </Space>
      ),
    },
    {
      title: "Assign Order",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button
            style={{ background: "#545BFC", color: "white", fontWeight: "500" }}
          >
            Assign Order
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
  };

  useEffect(() => {
    const getAgents = () => {
      let instance = AgentServices.getInstance();
      setLoading(true);
      instance
        .getAgentsList(pagination.pageNumber, pagination.limit)
        .then((res) => {
          setAgentsList(res);
          setLoading(false);
        });
      console.log("datal", agentsList);
    };
    getAgents();
  }, []);

  return (
    <div id="delivery-agent">
      <h3 className="heading">Delivery Agent List</h3>
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
