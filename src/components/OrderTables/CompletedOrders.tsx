import React, { useState } from "react";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import dummyData from "../../../dummyData";
import { DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "..";

export interface DataType {
  key: React.Key;
  date: string;
  payment_type: string;
  assigned_agent: string;
}

const CompletedOrders = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    total: 0,
    pageSize: 5,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });
  const handleTableChange = (pagination: any) => {
    console.log("pag", pagination);
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
  };

  const handleClick = (state: any) => {
    navigate(`/dashboard/order-details/${state.id}`, { state });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "OrderId",
      dataIndex: "orderId",
      key: "orderId",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Agent",
      dataIndex: "assigned_agent",
      key: "assigned_agent",
      render: (text: any) => (
        <p
          className="tableTxt"
          onClick={() => navigate("/dashboard/agent-details")}
        >
          {text}
        </p>
      ),
    },
    {
      title: "Vender Name",
      dataIndex: "storename",
      key: "storename",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
    {
      title: "Payment Mode",
      dataIndex: "payment_type",
      key: "payment",
      render: (_, record: any) => (
        <Space size="middle">
          {record?.payment_type === 2 ? (
            <p className="offline">COD</p>
          ) : (
            <p className="available">Online</p>
          )}
        </Space>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
   
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: any) => <p className="tableId">{text}</p>,
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
    <CustomTable
      columns={columns}
      data={dummyData.completedOrderData}
      pagination={pagination}
      handleTableChange={handleTableChange}
      loading={false}
    />
  );
};

export default CompletedOrders;
