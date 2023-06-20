import React, { useState, useEffect } from "react";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "..";
import OrderService from "../../services/OrderService";
import { ApiContants } from "../../constants/ApiContants";
import CustomizeDate from "../../utils/helpers/CustomizeDate";

export interface DataType {
  key: React.Key;
  date: string;
  payment_type: string;
  assigned_agent: string;
}

interface Props {
  activeTab: string;
}

const CompletedOrders: React.FC<Props> = ({ activeTab }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    total: data?.total,
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
  const columns: ColumnsType<DataType> = [
    {
      title: "OrderId",
      dataIndex: "id",
      key: "id",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Agent",
      dataIndex: "deliveryId",
      key: "deliveryId",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
    {
      title: "Vender Name",
      dataIndex: "storeId",
      key: "storeId",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      render: (text) => (
        <Space size="middle">
          <p className="available">{text}</p>
        </Space>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: () => <p className="tableTxt">{"Delivered"}</p>,
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => <p className="tableId">{ CustomizeDate.getDate(text)}</p>,
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

  const fetchOrder = () => {
    setLoading(true);
    OrderService.getAssignedOrdersList(pagination, "delivered")
      .then((res: any) => {
        if (res?.status === ApiContants.successCode) {
          setData(res?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Assignd Order Fetching Error", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, [activeTab, pagination.pageNumber]);
  return (
    <CustomTable
      columns={columns}
      data={data?.list}
      pagination={pagination}
      handleTableChange={handleTableChange}
      loading={loading}
    />
  );
};

export default CompletedOrders;
