import { Col, Row } from "antd";
import React from "react";
import { StatusCard } from "../../components";
import { AgentsIcon } from "../../assets";

const Management: React.FC = () => {
  return (
    <div id="management-dashboard">
      <div className="header">
        <span className="heading">Dashboard</span>
      </div>
      <div className="content">
        <Row gutter={[16, 16]} style={{marginBottom:"0.5rem"}}>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <StatusCard
              cardNumber={40536}
              cardTag={"Total Orders"}
              cardImage={AgentsIcon}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <StatusCard
              cardNumber={500}
              cardTag={"Associated Agents"}
              cardImage={AgentsIcon}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <StatusCard
              cardNumber={1000}
              cardTag={"My Agents"}
              cardImage={AgentsIcon}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <StatusCard
              cardNumber={1000}
              cardTag={"Orders Delivered"}
              cardImage={AgentsIcon}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{marginBottom:"0.5rem"}}>
        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <StatusCard
              cardNumber={500}
              cardTag={"Delivery Agents"}
              cardImage={AgentsIcon}
            />
          </Col>
          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
            <StatusCard
              cardNumber={40536}
              cardTag={"Orders"}
              cardImage={AgentsIcon}
            />
          </Col>
          
          
        </Row>
      </div>
    </div>
  );
};

export default Management;
