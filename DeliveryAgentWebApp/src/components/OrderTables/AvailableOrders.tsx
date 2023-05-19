import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  loading: boolean;
}
const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;

const AvailableOrders = () => {
  const [isMultiSelect, setMultiSelect] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState<Array<any>>();
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
        const updatedData = data.map((item: any) => {
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
      const formattedData = res?.data.map((item: any) => ({
        ...item,
        key: uuidv4(),
        loading: false,
      }));
      setData(formattedData);
      setLoading(false);
    }
  };
  // Cancel MultiSelect
  const cancelMultiSelect = () => {
    setMultiSelect(false);
    setSelectedOrders([]);
    setSelectedRowKeys([]);
  };
  // Onchange function of Multiselect
  const handleSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedOrders(selectedRows);
  };

  const multiAgentassignHandler = async () => {
    let payload: any = { orderId: [] };
    selectedOrders?.forEach((item) => payload.orderId.push(item.id));
    console.log("data", payload);
    setLoading(true);
    let instance = AgentServices.getInstance();
    let res = await instance.assignBulkOrderToAgent(payload);
    if (res?.status === ApiContants.successCode) {
      setLoading(false);
      cancelMultiSelect();
    }
  };
  const rowSelection = isMultiSelect
    ? {
        selectedRowKeys,
        onChange: handleSelectChange,
      }
    : null;

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div id="available-list">
      <div className="available-list-header">
        <div className="filter">
          <h1>Filters</h1>
        </div>
        <div className="action">
          {isMultiSelect ? (
            <Button
              type="default"
              className="custom-button"
              onClick={multiAgentassignHandler}
              style={{ backgroundColor: "#545BFC", color: "#fff" }}
            >
              {loading ? (
                <p>
                  {" "}
                  <Spin indicator={antIcon} /> Assigning...
                </p>
              ) : (
                "AssignInBulk"
              )}
            </Button>
          ) : (
            <Button
              type="default"
              className="custom-button"
              onClick={() => setMultiSelect(true)}
              style={{ backgroundColor: "#545BFC", color: "#fff" }}
            >
              AssignInBulk
            </Button>
          )}
          {isMultiSelect && (
            <Button
              type="default"
              className="custom-button"
              onClick={cancelMultiSelect}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
      <CustomTable
        rowSelection={rowSelection}
        columns={columns}
        data={data}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default AvailableOrders;
