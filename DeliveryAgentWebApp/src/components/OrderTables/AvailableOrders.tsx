import React, { useState } from "react";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Button, Space, Spin } from "antd";
import { ColumnsType } from "antd/es/table";
import { CustomTable } from "../index";
import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import AgentServices from "../../services/AgentServices";
import { ApiContants } from "../../constants/ApiContants";
import { useEffect } from "react";
import OrderServices from "../../services/OrderServices";

export interface DataType {
  key: React.Key;
  id: string;
  paymentType: string;
  shippingAddress: string;
  orderAmount: number;
}
const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;

const AvailableOrders = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    limit: 8,
    total: 0,
    pageSize: 5,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },

    {
      title: "Delivery Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
    {
      title: "Amount",
      key: "orderAmount",
      dataIndex: "orderAmount",
      render: (text: any) => <p className="tableTxt">{text}</p>,
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
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle">
          <Button
            style={{ background: "#545BFC", color: "white", fontWeight: "500" }}
            onClick={() => assignAgentHandler(record)}
            disabled={record?.loading}
          >
            {/* Assign Agent */}
            {record.loading ? (
              <p>
                {" "}
                <Spin indicator={antIcon} /> Assigning...
              </p>
            ) : (
              "Assign Agent"
            )}
          </Button>
        </Space>
      ),
    },
  ];
   // Assign Orders Function
  const assignAgentHandler = async (record: any) => {
    const payload = { orderId: Number(record?.id) };
    const newData = [...data];
    const index = newData.findIndex((item) => item.key === record.key);
    newData[index].loading = true; // Set loading state to true for the clicked row
    setData(newData);
    let instance = AgentServices.getInstance();
    instance.assignOrderToAgent(payload).then((res: any) => {
      if (res.status === ApiContants.successCode) {
        const updatedData = data.map((item:any) => {
          if (item.key === record.key) {
            return { ...item, loading: false };
          }
          return item;
        });
        setData(updatedData);
      }
    });
  };
  // Fetch Orders Function
  const fetchOrders = async () => {
    let instance = OrderServices.getInstance();
    setLoading(true);
    const res = await instance.getOrderList("1", "6");
    if (res?.data) {
      setData(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <CustomTable
      columns={columns}
      data={data}
      pagination={pagination}
      handleTableChange={handleTableChange}
      loading={loading}
    />
  );
};

export default AvailableOrders;
