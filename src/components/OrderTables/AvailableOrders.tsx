import React, { useState } from "react";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { CustomTable } from "../index";
// import { LoadingOutlined } from "@ant-design/icons";

import { DeliveryUserIcon, DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import dummyData from "../../../dummyData";

export interface DataType {
  key: React.Key;
  id: string;
  paymentType: number;
  shippingAddress: string;
  orderAmount: number;
  loading: boolean;
}
// const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;

const AvailableOrders = () => {
  const navigate = useNavigate();
  const data =dummyData.availableOrderData;
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    total: 0,
    pageSize: 5,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });

  const handleClick = (state: any) => {
    navigate(`/dashboard/order-details/${state.id}`, { state });
  };

  // Handle Chnage for Table
  const handleTableChange = (pagination: any) => {
    console.log("pag", pagination);
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "OrderId",
      dataIndex: "orderId",
      key: "orderid",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Vender Name",
      dataIndex: "storename",
      key: "storename",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentType",
      key: "paymentType",
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
      title: "Delivery Region",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <img src={DeliveryUserIcon} alt="" />
          <div onClick={() => handleClick(record)}>
            <img src={DetailsIcon} alt="" />
          </div>
        </Space>
      ),
    },
  ];

  // Handle FilterChange
  // const handleChange = (value: string | string[]) => {
  //   console.log(`Selected: ${value}`);
  //   setDeliveryType(value);
  //   fetchOrders(value);
  // };

  // useEffect(() => {
  //   fetchOrders(deliveryType);
  // }, [pagination.pageNumber]);

  return (
    <div id="available-list">
      <CustomTable
        columns={columns}
        data={data}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={false}
      />
    </div>
  );
};

export default AvailableOrders;
