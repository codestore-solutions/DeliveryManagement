import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
import dummyData from "../../../dummyData";
import { CustomTable } from "../../components";
import { Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AgentServices from "../../services/AgentServices";
import { DetailsIcon } from "../../assets";

export interface DataType {
  key: React.Key;
  deliveryAgentId: string;
  deliveryAgentName: string;
  orderId: string;
}

const AssignedAgents: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    limit: 8,
    total: 0,
    pageSize: 5,
    showTotal: (total: any, range: any) =>
      `${range[0]}-${range[1]} of ${total} items`,
  });
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, pageNumber: current, limit: pageSize });
  };
  const handleClick = (state: any) => {
    navigate(`/dashboard/order-details/${state.id}`, { state });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Sr No.",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (text) => <p className="tableId">{text}</p>,
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
        render: () => (
          <Space size="middle">
               <Link to='/track' style={{}}>Track</Link>
          </Space>
        ),
      },
  ];

  // Get All Assigned Delivery Agnets List
  const getAssignedAgnets = async () =>{
    let instance = AgentServices.getInstance();
    setLoading(true);
    instance
      .getAssignedAgents(pagination.pageNumber, pagination.pageSize)
      .then((res) => {
        const formattedData = res?.map((item: any) => ({
          ...item,
          key: uuidv4(),
          orderStatus: 'Pending',
          deliveryAgentName: 'Deepak Kumar'
        }));
        setData(formattedData);
        setLoading(false);
      });
    // console.log("dat", data);
  }
  
  // useEffect(() =>{
  //      getAssignedAgnets();
  // }, [])

  return (
    <div id="delivery-agent">
      <h3 className="heading">Assigned Agents</h3>
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
