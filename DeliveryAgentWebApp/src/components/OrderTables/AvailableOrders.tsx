import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Button, Input, Select, SelectProps, Space, Spin } from "antd";
import { ColumnsType } from "antd/es/table";
import { CustomTable } from "../index";
import { LoadingOutlined } from "@ant-design/icons";
import AgentServices from "../../services/AgentServices";
import { ApiContants } from "../../constants/ApiContants";
import { useEffect } from "react";
import OrderServices from "../../services/OrderServices";
import { DetailsIcon } from "../../assets";
import { useSelector, useDispatch } from "react-redux";

const { Search } = Input;

export interface DataType {
  key: React.Key;
  id: string;
  paymentType: string;
  shippingAddress: string;
  orderAmount: number;
  loading: boolean;
}
const antIcon = <LoadingOutlined style={{ color: "#fff" }} spin />;

const options: SelectProps["options"] = [
  {
    value: 1,
    label: "Fast Delivery",
  },
  {
    value: 0,
    label: "Normal Delivery",
  },
];

// Payment filter
let paymentFilter = [
  { text: "COD", value: 1 },
  { text: "Paid", value: 2 },
];

const AvailableOrders = () => {
  // const [isMultiSelect, setMultiSelect] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deliveryType, setDeliveryType] = useState<any>(1);
  const [selectedOrders, setSelectedOrders] = useState<Array<any>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [bulkloading, setBulkLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    total: 6,
    pageSize: 5,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });

  // Handle Chnage for Table
  const handleTableChange = (pagination: any) => {
    console.log("pag", pagination);
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
      filters: paymentFilter,
      render: (_, record: any) => (
        <Space size="middle">
          {record?.paymentType === 1 ? (
            <p className="codStatus">COD</p>
          ) : (
            <p className="verified">Paid</p>
          )}
        </Space>
      ),
      onFilter: (value, record) => record.paymentType === value,
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
          <img src={DetailsIcon} alt="" />
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
        fetchOrders(deliveryType);
      }
    });
  };
  // Fetch Orders Function
  const fetchOrders = async (deliveryType: any) => {
    let instance = OrderServices.getInstance();
    setLoading(true);
    const res = await instance.getOrderList(deliveryType, 0);
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
    setBulkLoading(true);
    let instance = AgentServices.getInstance();
    let res = await instance.assignBulkOrderToAgent(payload);
    if (res?.status === ApiContants.successCode) {
      setBulkLoading(false);
      fetchOrders(deliveryType);
      cancelMultiSelect();
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };

  // Handle FilterChange
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
    setDeliveryType(value);
    fetchOrders(value);
  };

  useEffect(() => {
    fetchOrders(deliveryType);
  }, [pagination.pageNumber]);

  return (
    <div id="available-list">
      <div className="available-list-header">
        <div className="filter">
          {/* <Search placeholder="Search here.." allowClear onSearch={onSearch} style={{ width: "30vw", padding:"5px 10px", outline:"none" }} /> */}
          <span>Filter: </span>
          <Select
            size={"large"}
            defaultValue={"Fast Delivery"}
            onChange={handleChange}
            options={options}
            style={{ width: "30vw" }}
          />
        </div>

        <div className="action">
          <Button
            type="default"
            className="custom-button"
            onClick={multiAgentassignHandler}
            style={{ backgroundColor: "#545BFC", color: "#fff" }}
          >
            {bulkloading ? (
              <p>
                {" "}
                <Spin indicator={antIcon} /> Assigning...
              </p>
            ) : (
              "AssignInBulk"
            )}
          </Button>

          {/* <Button
              type="default"
              className="custom-button"
              onClick={cancelMultiSelect}
            >
              Cancel
            </Button> */}
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
