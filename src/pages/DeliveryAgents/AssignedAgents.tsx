import React, { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import "./style.scss";
import { CustomTable } from "../../components";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { DetailsIcon } from "../../assets";
import OrderService from "../../services/OrderService";
import { ApiConstants } from "../../constants/ApiConstants";
import { pagination } from "../../utils/types";
import CustomizeDate from "../../utils/helpers/CustomizeDate";

export interface DataType {
  key: React.Key;
  date: string;
  deliveryAgentId: string;
  deliveryAgentName: string;
  orderId: string;
}

interface Props {
  activeTab?: string;
  searchInput?: string;
  filters?: any;
}
const AssignedAgents: React.FC<Props> = ({ activeTab }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log("data", data);
  const [pagination, setPagination] = useState<pagination>({
    simple: false,
    pageNumber: 1,
    total: data?.total,
    pageSize: 6,
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
  const columns: ColumnsType<DataType> = [
    {
      title: "Sr No.",
      dataIndex: "key",
      key: "key",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "OrderId",
      dataIndex: "id",
      key: "id",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Agent Name",
      dataIndex: "deliveryAgent",
      key: "deliveryAgent",
      render: (deliveryAgent) => (
        <p className="tableTxt">{deliveryAgent?.fullName}</p>
      ),
    },
    {
      title: "Store Name",
      dataIndex: "vendor",
      key: "vendor",
      render: (vendor) => <p className="tableId">{vendor?.business?.name}</p>,
    },

    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => (
        <p className="tableTxt">
          {orderStatus === 5
            ? "Assgined"
            : orderStatus === 6
            ? "Aceepted"
            : "Rejected"}
        </p>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => (
        <p className="tableTxt">{CustomizeDate.getDate(text)}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" onClick={() => handleClick(record)}>
          <img src={DetailsIcon} alt="" />
          {/* <span  onClick={() => trackOrder(record)}>
            <img src={TrackIcon} alt="" />
          </span> */}
        </Space>
      ),
    },
  ];

  const fetchOrder = () => {
    setLoading(true);
    OrderService.getAssignedOrdersList(pagination, [5, 6])
      .then((res: any) => {
        if (res?.status === ApiConstants.successCode) {
          setData(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Assigned Order Fetching Error", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, [activeTab, pagination.pageNumber]);
  useEffect(() => {
    setPagination({ ...pagination, total: data?.total });
  }, [data]);
  return (
    <div id="delivery-agent">
      <CustomTable
        columns={columns}
        data={data?.list}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default AssignedAgents;
