import React from "react";
import "./style.scss";
import '../../pages/DeliveryAgents/style.scss'
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dummyData from "../../../dummyData";

export interface DataType {
  key: React.Key;
  order_id: string;
  payment_type: string;
  assigned_agent: string;

}
const pageSizeOptions = ["6", "14", "21", "28"];

const AssignedOrders = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Payment Status",
      dataIndex: "payment_type",
      key: "payment",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },

    {
      title: "Assigned Agent",
      dataIndex: "assigned_agent",
      key: "assigned_agent",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
    
  ];
  return (
    <Table
      columns={columns}
      dataSource={dummyData.assignedOrderData}
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

export default AssignedOrders;
