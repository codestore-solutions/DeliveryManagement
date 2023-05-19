import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import "./style.scss";
import dummyData from "../../../dummyData";
import { CustomTable } from "../../components";

export interface DataType {
  key: React.Key;
  deliveryAgentId: string;
  deliveryAgentName: string;
  orderId: string;
}

const AssociatedAgents: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>(dummyData.assignedAgents);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    limit: 8,
    total: 0,
    pageSize: 5,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Agent ID",
      dataIndex: "deliveryAgentId",
      key: "deliveryAgentId",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Name",
      dataIndex: "deliveryAgentName",
      key: "deliveryAgentName",
      render: (text) => <p className="tableTxt">{text}</p>,
    },
    {
        title: "Order Status",
        dataIndex: "orderStatus",
        key: "orderStatus",
        render: (text) => <p className="tableTxt">{text}</p>,
      },
  ];
  return (
    <div id="delivery-agent">
      <h3 className="heading">Associated Agent List</h3>
      <CustomTable
        columns={columns}
        data={data}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default AssociatedAgents;
