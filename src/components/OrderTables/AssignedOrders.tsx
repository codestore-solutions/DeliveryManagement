import React, { useEffect } from "react";
import "./style.scss";
import "../../pages/DeliveryAgents/style.scss";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { DetailsIcon } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CustomTable } from "..";
import OrderService from "../../services/OrderService";
import { ApiContants } from "../../constants/ApiContants";
import CustomizeDate from "../../utils/helpers/CustomizeDate";
import { pagination } from "../../utils/types";
import {RightOutlined, LeftOutlined} from "@ant-design/icons";
// import moment from "moment";

export interface DataType {
  key: React.Key;
  date: string;
  payment_type: string;
  assigned_agent: string;
}

interface Props{
  activeTab:string
}

const AssignedOrders: React.FC<Props> = ({activeTab}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<pagination>({
    showLessItems: true,
    hideOnSinglePage: true,
    simple:true,
    pageNumber: 1,
    total: data?.total,
    pageSize: 6,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
    nextIcon: <RightOutlined style={{ color: '#545bfc', padding:'3px',  border:'1px solid #545bfc',fontSize: '16px', borderRadius:"5px" }} />,
    prevIcon: <LeftOutlined style={{color: '#545bfc' , padding:'3px', border:'1px solid #545bfc',fontSize: '16px', borderRadius:"5px"  }} />,
  });
  const handleTableChange = (pagination: any) => {
    console.log("pag", pagination);
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
      title: "Agent Name",
      dataIndex: "deliveryId",
      key: "deliveryId",
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
      render: () => <p className="tableTxt">Assigned</p>,
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
    OrderService.getAssignedOrdersList(pagination, 'agent_assigned')
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

  useEffect(() =>{
      fetchOrder();
  }, [activeTab,pagination.pageNumber])
  useEffect(() => {
    setPagination({ ...pagination, total: data?.total });
  }, [data]);
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

export default AssignedOrders;