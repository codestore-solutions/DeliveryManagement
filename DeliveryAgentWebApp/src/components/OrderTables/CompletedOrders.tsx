import React from "react";
import "./style.scss";
import '../../pages/DeliveryAgents/style.scss'
import { Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dummyData from "../../../dummyData";
import { DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";

export interface DataType {
  key: React.Key;
  order_id: string;
  payment_type: string;
  assigned_agent: string;

}
const pageSizeOptions = ["6", "14", "21", "28"];

const CompletedOrders = () => {
  const navigate = useNavigate();
  const handleClick = (state: any) => {
    navigate(`/dashboard/order-details/${state.id}`, { state });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Sr No.",
      dataIndex: "key",
      key: "key",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Payment Mode",
      dataIndex: "payment_type",
      key: "payment",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
    {
        title: "Order Staus",
        dataIndex: "status",
        key: "status",
        render: (text: any) => <p className="tableTxt">{text}</p>,
      },
    {
      title: "Agent",
      dataIndex: "assigned_agent",
      key: "assigned_agent",
      render: (text: any) => <p className="tableTxt" onClick={() => navigate('/dashboard/agent-details')}>{text}</p>,
    },
    {
      title: "Order Details",
      key: "action",
      render: (_, record) => (
        <Space size="middle" onClick={() => handleClick(record)}>
          <img src={DetailsIcon} alt="" />
        </Space>
      ),
    },
    
  ];
  return (
    <Table
      columns={columns}
      dataSource={dummyData.completedOrderData}
      pagination={{
        pageSizeOptions,
        showQuickJumper: true,
        pageSize: 6,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      className="custom-table"
    />
  );
};

export default CompletedOrders;
