import React from "react";
import "./style.scss";
import '../../pages/DeliveryAgents/style.scss'
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dummyData from "../../../dummyData";

export interface DataType {
  key: React.Key;
  order_id: string;
  payment_status: string;
  delivery_address: string;
  amount: number;
}
const pageSizeOptions = ["6", "14", "21", "28"];

const AvailableOrders = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },

    {
      title: "Delivery Address",
      dataIndex: "delivery_address",
      key: "delivery_address",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
    },
    {
      title: "Assign Agent",
      key: "action",
      render: () => (
        <Space size="middle">
          {/* <a>Assign Order</a> */}
          {/* <Select
            showSearch
            placeholder="Search Order Id"
            onSearch={handleSearch}
            optionFilterProp="label"
            style={{ minWidth: "160px" }}
          >
            {filteredOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select> */}
          <Button style={{ background: "#808080", color: "white" }}>
            Assign
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
    columns={columns}
    dataSource={dummyData.availableOrderData}
    pagination={{
      pageSizeOptions,
      showQuickJumper: true,
      pageSize: 4,
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} of ${total} items`,
    }}
    className="custom-table"
  />
  )
}

export default AvailableOrders