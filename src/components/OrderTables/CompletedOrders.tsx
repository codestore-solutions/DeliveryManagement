import React, { useState } from "react";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Space, Table, Button, DatePicker } from "antd";
import { ColumnsType } from "antd/es/table";
import dummyData from "../../../dummyData";
import { DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

export interface DataType {
  key: React.Key;
  date: string;
  payment_type: string;
  assigned_agent: string;
}
const pageSizeOptions = ["6", "14", "21", "28"];

const CompletedOrders = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<null>(null);
  const [tableData, setTableData] = useState(dummyData.completedOrderData);

  const handleDateFilter = (date: any) => {
    setSelectedDate(date);
    const formattedDate = date ? date.format("YYYY-MM-DD") : "";
    const filteredData = tableData.filter((item) => {
      console.log("d", item.date, formattedDate);
      if (item.date === formattedDate) {
        return item;
      }
    });
    console.log("fil", filteredData);
    setTableData(filteredData);
  };

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
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: any) => <p className="tableTxt">{text}</p>,
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <DatePicker
            value={selectedDate}
            format="DD/MM/YYYY"
            onChange={handleDateFilter}
            style={{ marginBottom: 8, display: "block" }}
          />
          <div style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                setSelectedDate(null);
                setTableData(dummyData.completedOrderData);
              }}
              size="small"
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilterDropdownVisibleChange: (visible: boolean) => {
        if (visible) {
          // Reset the selected date when the filter dropdown is opened
          setSelectedDate(null);
        }
      },
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
      dataSource={tableData}
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
