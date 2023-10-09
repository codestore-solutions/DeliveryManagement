import React, { useState, useEffect } from "react";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { CustomTable } from "..";
import OrderService from "../../services/OrderService";
import { ApiConstants } from "../../constants/ApiConstants";
import CustomizeDate from "../../utils/helpers/CustomizeDate";
import { pagination } from "../../utils/types";

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
  const [pagination, setPagination] = useState<pagination>({
    simple: false,
    pageNumber: 1,
    total: data?.total,
    pageSize: 7,
    // showTotal: (total: any, range: any) =>
    //   `${range[0]}-${range[1]} of ${total} items`,
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
      title: "Sr. No",
      dataIndex: "key",
      key: "key",
      render: (text: any) => <p className="tableId">{text}</p>,
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
      render: (deliveryAgent: any) => <p className="tableTxt">{deliveryAgent?.fullName}</p>,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor",
      key: "vendor",
      render: (vender: any) => <p className="tableTxt">{vender?.business?.name}</p>,
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      render: (_, record: any) => (
        <Space size="middle">
          {record?.paymentMode === 2 ? (
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
      render: () => <p className="tableTxt">{"Delivered"}</p>,
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => <p className="tableId">{CustomizeDate.getDate(text)}</p>,
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
    OrderService.getAssignedOrdersList(pagination, [11])
      .then((res: any) => {
        if (res?.status === ApiConstants.successCode) {
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
    if(activeTab === "3"){
      fetchOrder();
    }
  }, [activeTab, pagination.pageNumber]);
  useEffect(() => {
    setPagination({ ...pagination, total: data?.total });
  }, [data])
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
