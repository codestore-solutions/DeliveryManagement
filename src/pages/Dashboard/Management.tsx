import { Col, Row, Space, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { CustomTable, StatusCard } from "../../components";
import { AgentsIcon, DetailsIcon } from "../../assets";
import { ColumnsType } from "antd/es/table";
import CustomizeText from "../../utils/helpers/CustomizeText";

import AgentService from "../../services/AgentService";
import { ApiConstants } from "../../constants/ApiConstants";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

export interface DataType {
  key: React.Key;
  agentId: string;
  deliveryCount: string;
  agentName: string;
  region: string;
}

const Management: React.FC = () => {
  const navigate = useNavigate();
  const [agentData, setSetAgentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{
    totalAgentsCount: number;
    totalDeliveryCount: number;
  }>({ totalAgentsCount: 0, totalDeliveryCount: 0 });
  const handleClick = (state: any) => {
    console.log("state", state);
    navigate(`/dashboard/agent-details/${state.agentId}`, { state });
  };

  const getAgents = async () => {
    try {
      const { data, statusCode } = await AgentService.getTopPerfomingAgent();
      if (statusCode === ApiConstants.successCode) {
        setSetAgentData(data);
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };
  const getTotalAgentAndDelivery = async () => {
    try {
      const { data, statusCode } =
        await AgentService.getTotalAgentAndDelivery();
      if (statusCode === ApiConstants.successCode) {
        setData(data);
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Sr No.",
      dataIndex: "key",
      key: "key",
      render: (text) => <p className="tableId">{text}</p>,
    },
    {
      title: "Agent ID",
      dataIndex: "agentId",
      key: "agentId",
      render: (text: any) => <p className="tableId">{text}</p>,
    },
    {
      title: "Agent Name",
      dataIndex: "agentName",
      key: "agentName",
      render: (agentName) => <p className="tableTxt">{agentName}</p>,
    },
    {
      title: "Deliveries in last 7 days",
      dataIndex: "deliveryCount",
      key: "id",
      render: (text: any) => <p className="tableTxt">{text}</p>,
    },

    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (region: string) => CustomizeText(region),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <img src={DetailsIcon} alt="" onClick={() => handleClick(record)} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getTotalAgentAndDelivery();
    getAgents();
  }, []);

  return (
    <div id="management-dashboard">
      <div className="header">
        <span className="heading">Dashboard</span>
      </div>
      <div className="content">
        <Row gutter={[19, 19]} style={{ marginBottom: "0.5rem" }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <StatusCard
              cardNumber={data?.totalAgentsCount}
              cardTag={"Total Delivery Agents"}
              cardImage={AgentsIcon}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            {/* <StatusCard
              cardNumber={500}
              cardTag={"Total Deliveries For Today"}
              cardImage={AgentsIcon}
            /> */}
            <StatusCard
              cardNumber={data?.totalDeliveryCount}
              cardTag={"Total Completed Deliveries"}
              cardImage={AgentsIcon}
            />
          </Col>
        </Row>
        {/* <Row gutter={[19, 19]} style={{ marginBottom: "0.5rem" }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <StatusCard
              cardNumber={data?.totalDeliveryCount}
              cardTag={"Total Completed Deliveries"}
              cardImage={AgentsIcon}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <StatusCard
              cardNumber={50}
              cardTag={"Average Delivery Time"}
              cardImage={AgentsIcon}
            />
          </Col>
        </Row> */}
        <Title level={3} style={{ textAlign: "center" }}>
          5 Top Performing Agents
        </Title>
        <CustomTable
          columns={columns}
          data={agentData}
          pagination={false}
          loading={loading}
          // scroll={scrollConfig}
        />
      </div>
    </div>
  );
};

export default Management;
