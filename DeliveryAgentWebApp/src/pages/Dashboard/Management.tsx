import { Col, Row } from "antd";
import React from "react";

const Management: React.FC = () => {
  return (
    <div id="management-dashboard">
      <div className="header">
        <span className="heading">Business Management Dashborad</span>
      </div>
      <div className="content">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <div className="container">
              <h3>Agent Management</h3>
            </div>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <div className="container">
              <h3>Orders Management</h3>
            </div>
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <div className="container">
              <h3>Notifications</h3>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Management;
