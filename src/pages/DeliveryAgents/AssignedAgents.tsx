import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import "./style.scss";
import dummyData from "../../../dummyData";
import { CustomTable, DateRangePicker } from "../../components";
import { Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { DetailsIcon } from "../../assets";

export interface DataType {
  key: React.Key;
  date: string;
  deliveryAgentId: string;
  deliveryAgentName: string;
  orderId: string;
}

const AssignedAgents: React.FC = () => {
  const navigate = useNavigate();
  const loading = false;
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
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
  const handleClick = (state: any) => {
    navigate(`/dashboard/order-details/${state.id}`, { state });
  };
  const trackOrder = (state: any) => {
    navigate(`/dashboard/track-order/${state.key}`, { state });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Sr No.",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: any) => <p className="tableTxt">{text}</p>,
      filterDropdown: () => (
        <DateRangePicker setSelectedDateRange={setSelectedDateRange} />
      ),

      onFilterDropdownVisibleChange: (visible: boolean) => {
        if (visible) {
          // Reset the selected date when the filter dropdown is opened
          selectedDateRange(null);
        }
      },
    },

    {
      title: "Store Name",
      dataIndex: "storename",
      key: "storename",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Agent Name",
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
    {
      title: "Order Details",
      key: "action",
      render: (_, record) => (
        <Space size="middle" onClick={() => handleClick(record)}>
          <img src={DetailsIcon} alt="" />
        </Space>
      ),
    },
    {
      title: "Track Order",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => trackOrder(record)}>
            Track
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div id="delivery-agent">
      <CustomTable
        columns={columns}
        data={dummyData.assignedAgents}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default AssignedAgents;
