import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
import dummyData from "../../../dummyData";
import { CustomTable } from "../../components";
import { Space } from "antd";
import { Link } from "react-router-dom";
import AgentServices from "../../services/AgentServices";

export interface DataType {
  key: React.Key;
  deliveryAgentId: string;
  deliveryAgentName: string;
  orderId: string;
}

const AssignedAgents: React.FC = () => {
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
  const columns: ColumnsType<DataType> = [
    {
      title: "Agent ID",
      dataIndex: "deliveryAgentId",
      key: "deliveryAgentId",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Name",
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
        title: "Track Agent",
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
      .getAgentsList(pagination.pageNumber, pagination.pageSize)
      .then((res) => {
        const formattedData = res?.map((item: any) => ({
          ...item,
          key: uuidv4(),
          orderStatus: 'Pending',
        }));
        setData(formattedData);
        setLoading(false);
      });
    // console.log("dat", data);
  }
  
  useEffect(() =>{
       getAssignedAgnets();
  }, [])

  return (
    <div id="delivery-agent">
      <h3 className="heading">Assigned Agents</h3>
      <CustomTable
        columns={columns}
        data={data}
        pagination={pagination}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default AssignedAgents;
